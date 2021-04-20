import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';
import PaymentResultPage from '../../pages/payment/preauth-result';

jest.mock('../../modules/payment', () => ({
  PaymentResult: () => <div>Dummy PaymentResult Container</div>,
}));

describe('PaymentResultPage Page', () => {
  it('should match snapshot', async () => {
    const Component = withTheme(withIntl(PaymentResultPage));
    const passProps = {
      req: {
        body: {
          PaRes: 'test',
        },
      },
    };
    const props = await PaymentResultPage.getInitialProps(passProps);

    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
