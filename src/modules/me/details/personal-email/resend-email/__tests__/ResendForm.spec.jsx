import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../../../../i18n/withIntlProvider';
import withRedux from '../../../../../../redux/withReduxProvider';
import withTheme from '../../../../../../themes/withThemeProvider';

import ResendForm from '../ResendForm';
import { changePersonalEmail } from '../../../../api';

jest.mock(
  '../../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock(
  '../../../../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock('../../../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../api', () => ({
  changePersonalEmail: jest.fn(),
}));

describe('ResendForm Component', () => {
  let props = {};
  const setUp = (componentProps = props) => {
    const Component = withRedux(withIntl(withTheme(ResendForm)));
    return render(<Component {...componentProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();

    props = {
      profile: {
        role: 'Employee',
        memberId: 1,
        fullName: 'test name',
        email: 'test@currentEmail.com',
        dependants: [
          {
            memberId: 2,
            fullName: 'test name 2',
          },
          {
            memberId: 3,
            fullName: 'test name 3',
          },
        ],
      },
      changePersonalEmail: jest.fn(),
      requestedEmail: 'test@requestedEmail.com',
    };
  });

  it('should match snapshot', () => {
    const { container } = setUp();
    expect(container).toMatchSnapshot();
  });

  it('should validate form elements', () => {
    const { getByTestId, getByText } = setUp();
    const newEmailInput = getByTestId('input-newEmail').querySelector('input');

    fireEvent.change(newEmailInput, { target: { value: 'test@' } });
    fireEvent.blur(newEmailInput);
    expect(getByText(/Enter valid email address/)).toBeInTheDocument();
  });

  it('should init email and disable current email', () => {
    const { getByTestId } = setUp();
    const currentEmailInput = getByTestId('input-currentEmail').querySelector(
      'input',
    );

    expect(currentEmailInput).toBeDisabled();
    expect(currentEmailInput.value).toEqual('test@currentEmail.com');
  });

  it('should init new email', () => {
    const { getByTestId } = setUp();
    const newEmailInput = getByTestId('input-newEmail').querySelector('input');

    expect(newEmailInput).not.toBeDisabled();
    expect(newEmailInput.value).toEqual('test@requestedEmail.com');
  });

  it('should navigate to error page when error happen', () => {
    changePersonalEmail.mockImplementation(() => ({ error: true }));

    const { getByTestId } = setUp();

    const newEmailInput = getByTestId('input-newEmail').querySelector('input');
    fireEvent.change(newEmailInput, { target: { value: 'test@email.com' } });

    fireEvent.click(getByTestId('btn-submitResendEmail'));
    expect(props.changePersonalEmail).toHaveBeenCalled();
  });
});
