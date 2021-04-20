/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import React from 'react';

import withTheme from '../../../../themes/withThemeProvider';
import ResetPasswordHeader from '../ResetPasswordHeader';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('Reset Password Header Component', () => {
  it('should match the snapshot', () => {
    const Component = withTheme(withIntl(ResetPasswordHeader));

    const { container } = render(
      <Component userEmail="dummy@test.com" isFirstTimeUser={false} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot for the first time user', () => {
    const Component = withTheme(withIntl(ResetPasswordHeader));

    const { container } = render(
      <Component
        userEmail="dummy@test.com"
        productName="dummy"
        isFirstTimeUser
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
