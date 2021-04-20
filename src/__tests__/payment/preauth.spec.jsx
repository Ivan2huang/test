import React from 'react';
import { render } from '@testing-library/react';

import withIntl from '../../i18n/withIntlProvider';
import withTheme from '../../themes/withThemeProvider';
import PaymentPage from '../../pages/payment/preauth';

jest.mock('../../modules/payment', () => ({
  Payment: () => <div>Dummy CheckOut Container</div>,
  getMPGSSessionUrl: () =>
    Promise.resolve({
      mpgsSessionUrl:
        'https://ap-gateway.mastercard.com/form/version/53/merchant/TEST97485401/session.js',
    }),
}));

describe('PaymentPage Page', () => {
  it('should match snapshot', async () => {
    const Component = withIntl(withTheme(PaymentPage));
    const passProps = {
      req: {
        body: {
          callbackUrl: 'callbackUrl',
          jwt: 'jwt',
          PaRes: 'PaRes',
        },
      },
      res: {
        cookie: jest.fn(),
      },
    };
    const props = await PaymentPage.getInitialProps(passProps);

    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
