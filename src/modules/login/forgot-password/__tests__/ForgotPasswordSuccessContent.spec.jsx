/* eslint-disable react/prop-types */

import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import { withRouter } from 'next/router';

import ForgotPasswordSuccessContent from '../ForgotPasswordSuccessContent';
import withIntl from '../../../../i18n/withIntlProvider';
import { navigateTo } from '../../../../helpers/helpers';

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    login: '/login',
  },
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

describe('ForgotPasswordSuccessContent Component', () => {
  const props = {
    router: {
      query: {
        email: 'dummy@test.com',
        verify: true,
      },
    },
    forgotPassword: jest.fn(),
    showBackBtn: true,
  };
  const setUp = (componentProps = {}) => {
    const Component = withRouter(withIntl(ForgotPasswordSuccessContent));
    return render(<Component {...componentProps} />);
  };

  it('should match the snapshot', () => {
    const { container } = setUp(props);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when email is not provided', () => {
    const newProps = {
      ...props,
      router: {
        query: {
          email: 'test@email',
        },
      },
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when not show back to login provided', () => {
    const newProps = {
      ...props,
      showBackBtn: false,
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should return to login page when click on Back button', async () => {
    const { getByTestId } = setUp(props);

    const BackButton = getByTestId('btn-back-to-login');
    fireEvent.click(BackButton);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/login');
    });
  });

  it('should call forgot password api when clicked on resend link button', async () => {
    const { getByTestId } = setUp(props);

    const ResendButton = getByTestId('btn-resend-link');
    fireEvent.click(ResendButton);

    await wait(() => {
      expect(props.forgotPassword).toHaveBeenCalledTimes(1);
      expect(props.forgotPassword).toHaveBeenCalledWith('dummy@test.com', true);
    });
  });
});
