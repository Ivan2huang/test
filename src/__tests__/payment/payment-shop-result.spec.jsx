import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';
import CheckOutResultPage from '../../pages/payment/payment-shop-result';

// eslint-disable-next-line react/jsx-filename-extension
jest.mock('../../layouts/Header', () => () => <div>Header</div>);
jest.mock('../../modules/loader/LoaderContainer', () => () => (
  <div>LoaderContainer</div>
));

jest.mock('../../modules/payment', () => ({
  CheckOutResult: () => <div>Dummy CheckOutResult Container</div>,
}));

describe('PaymentShopResult Page', () => {
  it('should match snapshot', async () => {
    const Component = withTheme(withIntl(CheckOutResultPage));
    const passProps = {
      req: {
        body: {
          PaRes: 'test',
        },
      },
    };
    const props = await CheckOutResultPage.getInitialProps(passProps);

    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
