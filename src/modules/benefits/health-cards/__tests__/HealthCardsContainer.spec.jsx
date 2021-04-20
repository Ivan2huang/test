import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, wait } from '@testing-library/react';
import HealthCardsContainer from '../HealthCardsContainer';
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
  wallets: {
    isWalletsDisabled: false,
  },
  benefitStatus: {
    hasOutpatient: true,
    hasEHealthCard: true,
  },
};
describe('HealthCardsContainer', () => {
  it('should match snapshot', () => {
    const store = mockStore({
      me: getMe(false),
      benefits,
      loader: {},
    });
    const { container } = render(
      <Provider store={store}>
        <HealthCardsContainer />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should navigate to profile benefit if terminated employee', async () => {
    const store = mockStore({
      me: getMe(true),
      benefits,
      loader: {},
    });

    render(
      <Provider store={store}>
        <HealthCardsContainer />
      </Provider>,
    );

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledWith('/benefits/my-benefits');
    });
  });

  it('should navigate to benefits page when do not have health cards', async () => {
    const store = mockStore({
      me: getMe(true),
      benefits: {
        benefitStatus: {
          hasEHealthCard: false,
          hasOutpatient: false,
        },
      },
      loader: {},
    });

    render(
      <Provider store={store}>
        <HealthCardsContainer />
      </Provider>,
    );

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledWith('/benefits/my-benefits');
    });
  });
});
