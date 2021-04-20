/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../../../themes/withThemeProvider';
import ComponentLoaderAndError from '../ComponentLoaderAndError';

jest.mock('../../../loader/Loader', () => ({ children, ...rest }) => (
  <div>
    Loader Component
    <span>{mockPropsCapture(rest)}</span>
    {children}
  </div>
));

jest.mock('../Error', () => ({ children, ...rest }) => (
  <div>
    Error Component
    <span>{mockPropsCapture(rest)}</span>
    {children}
  </div>
));

describe('Component loader and error', () => {
  it('should match snapshot when loading', () => {
    const Component = withTheme(ComponentLoaderAndError);

    const { container } = render(
      <Component errorState loading>
        <span>Children</span>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
});
