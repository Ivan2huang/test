import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';
import PaymentShop from '../../pages/payment/payment-shop';

jest.mock('../../layouts/Header', () => () => <div>Header</div>);
jest.mock('../../modules/loader/LoaderContainer', () => () => (
  <div>LoaderContainer</div>
));

jest.mock('../../modules/payment', () => ({
  CheckOut: () => <div>Dummy CheckOut Container</div>,
  getMPGSSessionUrl: () =>
    Promise.resolve({
      mpgsSessionUrl:
        'https://ap-gateway.mastercard.com/form/version/53/merchant/TEST97485401/session.js',
    }),
}));

jest.mock('../../helpers/helpers', () => ({
  isValidLanguageCode: jest.fn(() => true),
}));

describe('PaymentShop Page', () => {
  it('should match snapshot', async () => {
    const Component = withTheme(withIntl(PaymentShop));
    const passProps = {
      req: {
        body: {
          callbackUrl: 'callbackUrl',
          jwt: 'jwt',
          order: '{}',
          lang: 'en-HK',
        },
      },
      res: {
        cookie: jest.fn(),
      },
    };
    const props = await PaymentShop.getInitialProps(passProps);

    const { container } = render(<Component {...props} />);
    expect(passProps.res.cookie).toHaveBeenCalledWith('lang', 'en-HK');
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with no order', async () => {
    const Component = withTheme(withIntl(PaymentShop));
    const passProps = {
      req: {
        body: {
          callbackUrl: 'callbackUrl',
          jwt: 'jwt',
          order: undefined,
        },
      },
      res: {
        cookie: jest.fn(),
      },
    };
    const props = await PaymentShop.getInitialProps(passProps);

    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
