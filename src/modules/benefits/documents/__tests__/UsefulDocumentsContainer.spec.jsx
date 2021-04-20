import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import UsefulDocumentsContainer from '../UsefulDocumentsContainer';
import withIntl from '../../../../i18n/withIntlProvider';

const mockStore = configureStore([]);

const storeData = {
  me: {
    member: {
      profile: {},
      wallets: {
        wallets: {},
        planYear: {},
        isWalletsDisabled: false,
      },
    },
  },
  benefits: {
    wallets: { wallets: {}, planYear: {}, isWalletsDisabled: false },
    documents: {
      usefulDocuments: [{ id: 1 }],
    },
    benefitStatus: {
      hasOutpatient: false,
    },
  },
};

describe('UsefulDocumentsContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore(storeData);
  });

  const Component = withIntl(UsefulDocumentsContainer);
  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
