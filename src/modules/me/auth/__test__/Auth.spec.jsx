import React from 'react';
import { render, wait } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Auth from '../AuthContainer';
import { navigateTo } from '../../../../helpers/helpers';
import { TERMINATED, NONE } from '../../constant';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('../../settings/reset-password/ResultModal', () => props => (
  <div {...props}>Result modal component</div>
));

const mockStore = configureStore([]);
const getMe = terminated => ({
  member: {
    profile: {
      role: 'Employee',
      memberId: 1,
      fullName: 'test name',
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
      status: terminated ? TERMINATED : NONE,
    },
  },
  settings: {},
});

describe('Profile checker', () => {
  const Component = withIntl(Auth);

  it('should redirect to details page for normal employee', async () => {
    const store = mockStore({ me: getMe(false) });
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
    await wait(() => {
      expect(navigateTo).toHaveBeenCalledWith('/me/details');
    });
  });

  it('should redirect to details page for terminated employee', async () => {
    const store = mockStore({ me: getMe(true) });
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
    await wait(() => {
      expect(navigateTo).toHaveBeenCalledWith('/me/details');
    });
  });
});
