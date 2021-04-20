import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../i18n/withIntlProvider';
import withTheme from '../../../themes/withThemeProvider';
import Disclaimer from '../Disclaimer';

jest.mock(
  '../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
  },
);

jest.mock(
  '../../../constants/config',
  // eslint-disable-next-line react/prop-types
  () => ({
    ...jest.requireActual('../../../constants/config'),
    paymentTermOfUseUrl: 'paymentTermOfUseUrl',
    defaultLanguage: 'en-HK',
  }),
);

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Disclaimer Component', () => {
  let Component;

  window.open = jest.fn();

  beforeEach(() => {
    Component = withIntl(withTheme(Disclaimer));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot', () => {
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should call window.open', () => {
    const { getByTestId } = render(<Component />);

    const link = getByTestId('open-term-of-use');
    fireEvent.click(link);

    expect(window.open).toHaveBeenCalledWith('paymentTermOfUseUrl');
  });

  it('should post message to webview', () => {
    window.ReactNativeWebView = {
      postMessage: jest.fn(),
    };
    const { getByTestId } = render(<Component />);

    const link = getByTestId('open-term-of-use');
    fireEvent.click(link);

    expect(window.ReactNativeWebView.postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'OPEN_TERM_OF_USE',
        url: 'paymentTermOfUseUrl',
      }),
    );
  });
});
