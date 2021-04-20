import React from 'react';
import { render } from '@testing-library/react';

import SideBar from '../SideBar';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';
import benefitsList from '../../modules/benefits/benefitsList';

jest.mock('../../i18n/lang', () => ({
  messages: {},
  langs: ['en'],
}));

describe('SideBar Component', () => {
  const defProps = {
    active: 'faq',
    items: benefitsList({}),
    labelPrefix: 'benefits.tabs.label.',
  };

  it('should match snapshot', () => {
    const props = {
      ...defProps,
      handleChange: jest.fn(),
    };
    const Component = withIntl(withTheme(SideBar));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when support mobile only', () => {
    const props = {
      ...defProps,
      handleChange: jest.fn(),
      isMobileOnly: true,
    };
    const Component = withIntl(withTheme(SideBar));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
