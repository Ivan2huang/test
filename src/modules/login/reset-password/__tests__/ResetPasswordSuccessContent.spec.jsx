/* eslint-disable react/prop-types */

import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';

import ResetPasswordSuccess from '../ResetPasswordSuccess';
import withIntl from '../../../../i18n/withIntlProvider';
import { navigateTo } from '../../../../helpers/helpers';

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    logout: '/logout',
  },
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

describe('ResetPasswordSuccessContent Component', () => {
  const props = {};
  const setUp = (componentProps = {}) => {
    const Component = withIntl(ResetPasswordSuccess);
    return render(<Component {...componentProps} />);
  };

  it('should match the snapshot', () => {
    const { container } = setUp(props);

    expect(container).toMatchSnapshot();
  });

  it('should return to login page when click on Back to login button', async () => {
    const { getByTestId } = setUp(props);

    const BackButton = getByTestId('btn-back-to-login');
    fireEvent.click(BackButton);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/logout');
    });
  });
});
