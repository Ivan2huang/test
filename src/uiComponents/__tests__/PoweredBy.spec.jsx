import React from 'react';
import { render } from '@testing-library/react';

import PoweredBy from '../PoweredBy';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';

jest.mock('../Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock('../../constants/config', () => ({
  defaultLanguage: 'en-HK',
}));

describe('PoweredBy UI Component', () => {
  it('should match snapshot', () => {
    const Component = withIntl(withTheme(PoweredBy));
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
