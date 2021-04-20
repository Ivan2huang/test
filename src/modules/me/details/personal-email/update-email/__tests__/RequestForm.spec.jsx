import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../../../../i18n/withIntlProvider';
import withRedux from '../../../../../../redux/withReduxProvider';
import withTheme from '../../../../../../themes/withThemeProvider';

import RequestForm from '../RequestForm';
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

describe('RequestForm Component', () => {
  const props = {
    profile: {
      role: 'Employee',
      memberId: 1,
      fullName: 'test name',
      email: 'test@oldEmail.com',
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
  };
  const setUp = (componentProps = props) => {
    const Component = withRedux(withIntl(withTheme(RequestForm)));
    return render(<Component {...componentProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = setUp();
    expect(container).toMatchSnapshot();
  });

  it('should validate form elements', () => {
    const { getByTestId, getByText, queryByText } = setUp();
    const newEmailInput = getByTestId('input-newEmail').querySelector('input');
    const confirmEmailInput = getByTestId('input-confirmEmail').querySelector(
      'input',
    );
    fireEvent.change(newEmailInput, { target: { value: 'test@' } });
    fireEvent.blur(newEmailInput);
    expect(getByText(/Enter valid email address/)).toBeInTheDocument();

    fireEvent.change(newEmailInput, { target: { value: 'test@email.com' } });
    fireEvent.blur(newEmailInput);
    expect(queryByText(/Enter valid email address/)).not.toBeInTheDocument();

    fireEvent.change(confirmEmailInput, { target: { value: 'test@' } });
    fireEvent.blur(confirmEmailInput);
    expect(getByText(/Enter valid email address/)).toBeInTheDocument();

    fireEvent.change(confirmEmailInput, {
      target: { value: 'test@email.com' },
    });
    fireEvent.blur(confirmEmailInput);
    expect(queryByText(/Enter valid email address/)).not.toBeInTheDocument();

    fireEvent.change(confirmEmailInput, {
      target: { value: 'test1@email.com' },
    });
    expect(queryByText(/Emails do not match/)).toBeInTheDocument();
  });

  it('should navigate to error page when error happen', () => {
    changePersonalEmail.mockImplementation(() => ({ error: true }));

    const { getByTestId } = setUp();

    const newEmailInput = getByTestId('input-newEmail').querySelector('input');
    const confirmEmailInput = getByTestId('input-confirmEmail').querySelector(
      'input',
    );

    fireEvent.change(newEmailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(confirmEmailInput, {
      target: { value: 'test@email.com' },
    });

    fireEvent.click(getByTestId('btn-submitUpdateEmail'));
    expect(props.changePersonalEmail).toHaveBeenCalled();
  });
});
