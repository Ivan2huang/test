/* eslint-disable eslint-disable-next-line,react/no-array-index-key,react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { withTheme } from '@material-ui/core';
import { render } from '@testing-library/react';

import PolicyDetails from '../PolicyDetails';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock('../../../../uiComponents/Grid', () => ({ children, ...rest }) => (
  <div {...rest}>
    Grid
    {children}
  </div>
));
jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      GridItem
      {children}
    </div>
  ),
);
jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatDate: jest.fn(date => date),
}));

describe('Policy Details', () => {
  const props = {
    insurer: 'Axa',
    policyNumber: '1234',
    effectiveFrom: '20 Aug 2018',
    effectiveTo: '29 Aug 2019',
  };
  it('should render Policy Details Component', () => {
    const Component = withIntl(withTheme(PolicyDetails));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
