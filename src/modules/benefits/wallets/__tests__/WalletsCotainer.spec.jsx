import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import WalletsContainer from '../WalletsContainer';

const mockStore = configureStore([]);

const storeData = {
  me: {
    member: {
      profile: {
        role: 'Admin',
      },
    },
  },
  benefits: {
    wallets: { wallets: {}, planYear: {}, isWalletsDisabled: false },
    benefitStatus: {
      hasOutpatient: false,
    },
  },
};

describe('Wallets Container', () => {
  let store;

  beforeEach(() => {
    store = mockStore(storeData);
  });

  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <WalletsContainer />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
