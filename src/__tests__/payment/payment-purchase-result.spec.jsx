import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';
import PurchaseResultPage from '../../pages/payment/payment-purchase-result';

// eslint-disable-next-line react/jsx-filename-extension
jest.mock('../../layouts/Header', () => () => <div>Header</div>);
jest.mock('../../modules/loader/LoaderContainer', () => () => (
  <div>LoaderContainer</div>
));

jest.mock('../../modules/payment', () => ({
  PurchaseResult: () => <div>Dummy PurchaseResult Container</div>,
}));

describe('PaymentShopResult Page', () => {
  it('should match snapshot', async () => {
    const Component = withTheme(withIntl(PurchaseResultPage));
    const passProps = {
      req: {
        body: {
          PaRes: 'test',
        },
      },
    };
    const props = await PurchaseResultPage.getInitialProps(passProps);

    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
