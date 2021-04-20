/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import Error from '../Error';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      Typography Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

describe('Error component', () => {
  it('should match snapshot', () => {
    const Component = withIntl(withTheme(Error));
    const { container } = render(
      <Component errorState={false}>
        <div>Test</div>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error has occurred', () => {
    const Component = withIntl(withTheme(Error));
    const { container } = render(
      <Component errorState>
        <div>Test</div>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error has occurred with errorMessage', () => {
    const Component = withIntl(withTheme(Error));
    const { container } = render(
      <Component errorState errorMessage="Custom Error">
        <div>Test</div>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
});
