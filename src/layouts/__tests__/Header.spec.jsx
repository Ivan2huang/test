import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { withStyles } from '@material-ui/core';

import Header, { style } from '../Header';
import withTheme from '../../themes/withThemeProvider';
import { navigateTo } from '../../helpers/helpers';
import withRedux from '../../redux/withReduxProvider';
import withIntl from '../../i18n/withIntlProvider';

jest.mock('../NavBar', () => props => <div {...props}>NavBar Component</div>);
jest.mock('../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  isEmpty: jest.fn(),
}));
jest.mock('../../constants/config', () => ({
  locales: {
    ENGLISH: 'en-HK',
    CHINESE: 'zh-HK',
  },
  defaultLanguage: 'en-HK',
}));

describe('Header Component', () => {
  it('should match snapshot', () => {
    const Component = withRedux(withTheme(withStyles(style)(withIntl(Header))));
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to default on click of Logo', () => {
    const Component = withRedux(withTheme(withStyles(style)(withIntl(Header))));
    const { getByTestId } = render(<Component />);
    const linkLogo = getByTestId('link-logo');
    fireEvent.click(linkLogo);
    expect(navigateTo).toHaveBeenCalledWith('/');
  });

  it('should use default logo when selected logo with language not found', () => {
    const Component = withRedux(withTheme(withStyles(style)(withIntl(Header))));
    const { container } = render(<Component preferredLocale="en-US" />);

    expect(container).toMatchSnapshot();
  });
});
