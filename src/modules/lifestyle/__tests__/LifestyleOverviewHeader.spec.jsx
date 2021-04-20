/* eslint-disable react/prop-types */
import React from 'react';

import { render } from '@testing-library/react';

import withIntl from '../../../i18n/withIntlProvider';
import LifestyleOverviewHeader from '../LifestyleOverviewHeader';

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>
    {children}
    (Typography)
  </div>
));

jest.mock('../../../uiComponents/GridItem', () => ({ columns, children }) => (
  <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
    <span>GridItem Component</span>
    <div>{children}</div>
  </div>
));

jest.mock('../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock('../LifestyleButtons', () => ({ questionnaireUpdateButton }) => (
  <div>
    <span>{questionnaireUpdateButton ? 'update button' : 'add button'}</span>
    <span>clinic button</span>
  </div>
));

describe('Lifestyle overview header Component', () => {
  let result;

  beforeEach(() => {
    const Component = withIntl(LifestyleOverviewHeader);
    result = render(<Component />);
  });

  it('should match snapshot', () => {
    const { container } = result;
    expect(container).toMatchSnapshot();
  });
});
