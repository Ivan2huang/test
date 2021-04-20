import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { withStyles } from '@material-ui/core';
import withIntl from '../../../i18n/withIntlProvider';
import withTheme from '../../../themes/withThemeProvider';
import AddNewCard from '../AddNewCard';

// eslint-disable-next-line react/prop-types
jest.mock('../../../uiComponents/Typography', () => ({ children }) => {
  return <div>{children}</div>;
});

jest.mock(
  '../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ children, props }) => (
    <div {...props}>
      GridItem Component
      {children}
    </div>
  ),
);

describe('AddNewCard Component', () => {
  let Component;
  const submitEnrollInstrument = jest.fn();
  const props = {
    show: false,
    submitEnrollInstrument,
    submitLabel: 'submitLabel',
  };
  const styles = {
    input: {},
    error: {},
  };
  const formSessionUpdate = jest.fn().mockImplementation(response => {
    submitEnrollInstrument(response.session.id);
  });
  const updateSessionFromForm = jest.fn().mockImplementation(() => {
    window.PaymentSession.callbacks.formSessionUpdate({
      status: 'ok',
      session: {
        id: 'sessionId',
      },
      sourceOfFunds: {
        provided: {
          card: {
            securityCode: 'securityCode',
          },
        },
      },
      errors: {},
    });
  });

  window.PaymentSession = {
    configure: jest.fn().mockReturnValue({}),
    callbacks: {
      formSessionUpdate,
    },
    updateSessionFromForm,
  };

  beforeEach(() => {
    Component = withIntl(withStyles(styles)(withTheme(AddNewCard)));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when show is false', () => {
    const { container, getByTestId } = render(<Component {...props} />);
    const submitButton = getByTestId('btn-submit-card');

    expect(submitButton.textContent).toBe('submitLabel');
    expect(container).toMatchSnapshot();
  });

  it('should match to snapshot when showDisclaimer is true', () => {
    const { container } = render(<Component {...props} showDisclaimer />);
    expect(container).toMatchSnapshot();
  });

  it('should match to snapshot when show is true', () => {
    const { container } = render(
      <Component
        {...{
          ...props,
          show: true,
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should show submit button with translated text when submitLabel was not provided', () => {
    const { container, getByTestId } = render(
      <Component
        {...{
          ...props,
          submitLabel: undefined,
        }}
      />,
    );
    const submitButton = getByTestId('btn-submit-card');

    expect(container).toMatchSnapshot();
    expect(submitButton.textContent).not.toBe('submitLabel');
  });

  it('should trigger submit card form when click submit button', () => {
    const { getByTestId } = render(<Component {...props} />);

    const submitButton = getByTestId('btn-submit-card');
    fireEvent.click(submitButton);

    expect(updateSessionFromForm).toHaveBeenCalledTimes(1);
  });
});
