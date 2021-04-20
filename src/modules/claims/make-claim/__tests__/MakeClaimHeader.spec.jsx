/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import MakeClaimHeader from '../MakeClaimHeader';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('MakeClaimHeader Component', () => {
  it('should match the snapshot', () => {
    const Component = withIntl(withTheme(MakeClaimHeader));

    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
