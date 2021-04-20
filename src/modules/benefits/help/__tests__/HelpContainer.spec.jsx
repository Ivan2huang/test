import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import HelpContainer from '../HelpContainer';
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
    help: {
      companyContactDetails: {
        email: 'dummy@test.com',
        phone: '+852 3070 5005',
        customerSupportHours:
          '09:00 AM - 05:30 PM Monday to Friday (except Hong Kong Public Holidays)',
      },
      faqs: [
        {
          name: 'Coverage',
          content: 'Where can i find the doctor list?',
        },
        {
          name: 'Claims status',
          content: 'What is the claim turnaround time?',
        },
      ],
    },
    wallets: {
      isWalletsDisabled: false,
    },
    benefitStatus: {
      hasOutpatient: false,
    },
  },
  loader: {},
};

describe('HelpContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore(storeData);
  });

  const Compnent = withIntl(HelpContainer);

  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Compnent />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
