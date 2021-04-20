import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import BenefitsContainer from '../BenefitsContainer';

const mockStore = configureStore([]);

const claim = {
  makeClaim: {
    walletBalance: {
      memberToWalletBalanceMap: {
        '12': 2000,
        '27': 1000,
      },
    },
  },
};

const me = {
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
    },
  },
};

const benefits = {
  wallets: {
    isWalletsDisabled: false,
  },
  benefitStatus: {
    hasOutpatient: false,
  },
};

describe('BenefitsContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      claim,
      me,
      benefits,
      loader: {},
    });
  });

  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <BenefitsContainer />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
