/* eslint-disable eslint-disable-next-line,react/no-array-index-key,react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import React from 'react';
import { render } from '@testing-library/react';

import Wallets from '../Wallets';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import CONFIG from '../../../../constants/config';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment');
  const moment = jest.fn(() => {
    return originalMoment(new Date('2020/04/18'));
  });
  moment.utc = originalMoment.utc;
  return moment;
});

describe('Wallets Component', () => {
  const props = {
    wallets: {
      expiryDate: '2020/04/18',
      wallets: [{ memberId: 1 }],
    },
  };

  it('should match the snapshot', () => {
    props.tableBottomBorderRequire = true;
    const Component = withIntl(withTheme(Wallets));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when useCurrencySymbol is true', () => {
    CONFIG.useCurrencySymbol = true;
    props.tableBottomBorderRequire = true;
    const Component = withIntl(withTheme(Wallets));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
