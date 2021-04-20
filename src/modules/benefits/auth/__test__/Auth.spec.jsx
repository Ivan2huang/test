import React from 'react';
import { render, wait } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Auth from '../AuthContainer';
import { navigateTo } from '../../../../helpers/helpers';
import { TERMINATED, NONE } from '../../constant';

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

const mockStore = configureStore([]);
const getMe = terminated => ({
  member: {
    wallets: {
      wallets: {},
      planYear: {},
      isWalletsDisabled: false,
    },
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
});

const benefits = {
  wallets: {},
  benefitStatus: {
    hasEHealthCard: true,
  },
};

describe('Profile checker', () => {
  it('should redirect to health-cards page for normal employee', async () => {
    const store = mockStore({ me: getMe(false), benefits });
    const { container } = render(
      <Provider store={store}>
        <Auth />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
    await wait(() => {
      expect(navigateTo).toHaveBeenCalledWith('/benefits/healthcards');
    });
  });

  it('should redirect to benefits page for terminated employee', async () => {
    const store = mockStore({ me: getMe(true), benefits });
    const { container } = render(
      <Provider store={store}>
        <Auth />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
    await wait(() => {
      expect(navigateTo).toHaveBeenCalledWith('/benefits/my-benefits');
    });
  });
});
