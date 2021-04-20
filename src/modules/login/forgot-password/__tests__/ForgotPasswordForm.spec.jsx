/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import ForgotPasswordForm from '../ForgotPasswordForm';
import withIntl from '../../../../i18n/withIntlProvider';
import withRedux from '../../../../redux/withReduxProvider';
import { navigateTo } from '../../../../helpers/helpers';
import { required, email } from '../../../../helpers/validation';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  navigateTo: jest.fn(),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    login: '/login',
    forgotPasswordSuccess: '/forgotPasswordSuccess',
  },
}));

jest.mock('../../../../helpers/validation', () => ({
  required: jest.fn(() => false),
  email: jest.fn(() => false),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock(
  '../../../../uiComponents/ButtonGroup',
  () => ({ children, inverse, ...rest }) => (
    <div data-inverse={inverse} {...rest}>
      <span>Button Group Component</span>
      {children}
    </div>
  ),
);

describe('ForgotPasswordForm Component', () => {
  const props = {
    forgotPassword: jest.fn(),
  };
  const setUp = (componentProps = props) => {
    const Component = withRedux(withIntl(ForgotPasswordForm));
    return render(<Component {...componentProps} />);
  };
  const emailError = 'Enter valid email address';

  afterEach(() => {
    navigateTo.mockReset();
    required.mockReset();
    email.mockReset();
  });

  it('should match the snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should return to login page when click on Back button', async () => {
    const { getByTestId } = setUp();

    const BackButton = getByTestId('btn-back');
    fireEvent.click(BackButton);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/login');
    });
  });

  it('should have Prompted email error message when no email is specified', async () => {
    required.mockReturnValue(() => true);
    email.mockReturnValue(() => false);

    const { getAllByText, getByTestId } = setUp();
    const emailInput = getByTestId('input-resetEmail').querySelector('input');
    const resetPasswordButton = getByTestId('btn-resetPassword');

    fireEvent.change(emailInput, { target: { value: null } });
    fireEvent.click(resetPasswordButton);

    await wait(() => {
      expect(getAllByText(emailError).length).toBe(1);
    });
  });

  it('should have Prompted email error message when invalid email is entered', async () => {
    required.mockReturnValue(() => false);
    email.mockReturnValue(() => true);

    const { getAllByText, getByTestId } = setUp();
    const emailInput = getByTestId('input-resetEmail').querySelector('input');

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.blur(emailInput);

    await wait(() => {
      expect(getAllByText(emailError).length).toBe(1);
    });
  });

  it('should have call success page on submit', async () => {
    const { getByTestId } = setUp();
    const emailInput = getByTestId('input-resetEmail').querySelector('input');
    const resetPasswordButton = getByTestId('btn-resetPassword');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.click(resetPasswordButton);

    await wait(() => {
      expect(props.forgotPassword).toHaveBeenCalledTimes(1);
      expect(props.forgotPassword).toHaveBeenCalledWith('test@test.com');
    });
  });
});
