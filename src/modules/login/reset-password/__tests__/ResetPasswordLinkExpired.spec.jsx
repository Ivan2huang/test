/* eslint-disable react/prop-types */

import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';

import ResetPasswordLinkExpired from '../ResetPasswordLinkExpired';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

describe('ResetPasswordLinkExpired Component', () => {
  const props = {
    forgotPassword: jest.fn(),
    router: {
      query: {
        email: 'dummy@test.com',
        verify: true,
      },
    },
  };
  const setUp = (componentProps = {}) => {
    const Component = withIntl(ResetPasswordLinkExpired);
    return render(<Component {...componentProps} />);
  };

  it('should match the snapshot', () => {
    const { container } = setUp(props);

    expect(container).toMatchSnapshot();
  });

  it('should forgot password api when clicked on resend link button', async () => {
    const { getByTestId } = setUp(props);

    const BackButton = getByTestId('btn-resend-link');
    fireEvent.click(BackButton);

    await wait(() => {
      expect(props.forgotPassword).toHaveBeenCalledTimes(1);
      expect(props.forgotPassword).toHaveBeenCalledWith('dummy@test.com', true);
    });
  });
});
