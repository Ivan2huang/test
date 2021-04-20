import React from 'react';
import { render, act } from '@testing-library/react';
import ResetPassword from '../ResetPassword';
import withIntl from '../../../../i18n/withIntlProvider';

jest.useFakeTimers();

jest.mock('../ResetPasswordHeader', () => props => (
  <div>
    <div>Header Component</div>
    <span>
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../ResetPasswordForm', () => props => (
  <div>
    <span>Reset Password Form Component</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../VerifyAccountForm', () => props => (
  <div>
    <span>Verify Account Form Component</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('Reset Password Component', () => {
  const setUp = props => {
    const Component = withIntl(ResetPassword);
    return render(<Component {...props} />);
  };

  const props = {
    isFirstTimeUser: false,
    verifyRequired: 'verifyRequired',
    dateOfBirthMatch: { errorState: false },
    resetPassword: jest.fn(),
    setFormErrorIfDateOfBirthNoMatch: jest.fn(),
    validateResetPasswordRequest: jest.fn(),
    router: {
      query: {
        email: 'test@tests.com',
        token: '1k2j32',
        productName: 'product',
        clientId: 'clientA',
      },
    },
    getProductName: jest.fn(),
  };
  it('should validate email and token on load', () => {
    setUp(props);
    expect(props.validateResetPasswordRequest).toHaveBeenCalledTimes(1);
    expect(props.validateResetPasswordRequest).toHaveBeenCalledWith(
      'test@tests.com',
      null,
      '1k2j32',
      'clientA',
    );
  });

  it('should match snapshot when there is no dateOfBirthMatch error', () => {
    const newProps = {
      ...props,
      dateOfBirthMatch: { errorState: null },
    };
    const { container } = setUp(newProps);
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when there is no dateOfBirthMatch error is true', () => {
    const newProps = {
      ...props,
      dateOfBirthMatch: { errorState: true },
    };
    const { container } = setUp(newProps);
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when additionalVerification param is false and there is no dateOfBirthMatch error', () => {
    const newProps = {
      ...props,
      router: {
        query: {
          email: 'test@tests.com',
          token: '1k2j32',
          productName: 'product',
          additionalVerification: 'false',
          clientId: 'clientA',
        },
      },
      dateOfBirthMatch: { errorState: null },
    };
    const { container } = setUp(newProps);
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when additionalVerification param is false and dateOfBirthMatch is true', () => {
    const newProps = {
      ...props,
      router: {
        query: {
          email: 'test@tests.com',
          token: '1k2j32',
          productName: 'product',
          additionalVerification: 'false',
          clientId: 'clientA',
        },
      },
      dateOfBirthMatch: { errorState: true },
    };
    const { container } = setUp(newProps);
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });
});
