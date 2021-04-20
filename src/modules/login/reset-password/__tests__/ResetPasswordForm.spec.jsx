/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import ResetPasswordForm from '../ResetPasswordForm';
import withIntl from '../../../../i18n/withIntlProvider';
import withRedux from '../../../../redux/withReduxProvider';
import { required, password } from '../../../../helpers/validation';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  navigateTo: jest.fn(),
}));

jest.mock('../../../../helpers/validation', () => ({
  required: jest.fn(() => false),
  password: jest.fn(() => false),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock(
  '../../../../uiComponents/ButtonGroup',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      <span>Button Group Component</span>
      {children}
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/ButtonGroup',
  () => ({ children, inverse, ...rest }) => (
    <div data-inverse={inverse} {...rest}>
      <span>Button Group Component</span>
      {children}
    </div>
  ),
);

describe('ResetPasswordForm Component', () => {
  const props = {
    resetPassword: jest.fn(),
    isFirstTimeUser: false,
  };
  const setUp = (componentProps = props) => {
    const Component = withRedux(withIntl(ResetPasswordForm));
    return render(<Component {...componentProps} />);
  };

  afterEach(() => {
    required.mockReset();
    password.mockReset();
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot for first time user', () => {
    const newProps = { ...props, isFirstTimeUser: true };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when new password and confirm new password are not entered', async () => {
    required.mockReturnValue(true);

    const { container, getByTestId, getAllByText } = setUp();
    const resetPasswordButton = getByTestId('btn-submit-password');

    fireEvent.click(resetPasswordButton);

    await wait(() => {
      expect(container).toMatchSnapshot();
      expect(getAllByText(/password.validations.required/).length).toBe(2);
    });
  });

  it('should match snapshot when new password is not compliant', async () => {
    required.mockReturnValue(undefined);
    password.mockReturnValue(true);

    const { container, getByTestId } = setUp();
    const passwordInput = getByTestId('input-new-password').querySelector(
      'input',
    );
    const resetPasswordButton = getByTestId('btn-submit-password');

    fireEvent.change(passwordInput, { target: { value: 'Test' } });
    fireEvent.click(resetPasswordButton);

    await wait(() => {
      expect(container).toMatchSnapshot();
      expect(container.innerHTML).toMatch(/password.validations.compliance/);
    });
  });

  it('should match snapshot when new password and confirm new password do not match', async () => {
    required.mockReturnValue(undefined);
    password.mockReturnValue(undefined);

    const { container, getByTestId } = setUp();
    const passwordInput = getByTestId('input-new-password').querySelector(
      'input',
    );
    const confirmPasswordInput = getByTestId(
      'input-confirm-password',
    ).querySelector('input');
    const resetPasswordButton = getByTestId('btn-submit-password');

    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test' } });
    fireEvent.click(resetPasswordButton);

    await wait(() => {
      expect(container).toMatchSnapshot();
      expect(container.innerHTML).toMatch(/password.validations.match/);
    });
  });

  it('should have call success page on submit', async () => {
    const newProps = {
      ...props,
      email: 'test@dummy.com',
      token: '123',
      clientId: 'clientA',
    };
    const { getByTestId } = setUp(newProps);
    const passwordInput = getByTestId('input-new-password').querySelector(
      'input',
    );
    const confirmPasswordInput = getByTestId(
      'input-confirm-password',
    ).querySelector('input');

    const resetPasswordButton = getByTestId('btn-submit-password');

    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test@123' } });
    fireEvent.click(resetPasswordButton);

    await wait(() => {
      expect(props.resetPassword).toHaveBeenCalledTimes(1);
      expect(props.resetPassword).toHaveBeenCalledWith(
        'test@dummy.com',
        'Test@123',
        '123',
        false,
        undefined,
        'clientA',
      );
    });
  });
});
