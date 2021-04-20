/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import LifestyleHistory from '../LifestyleHistory';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock(
  '../../../common/shared/ComponentLoaderAndError',
  () => ({ children, ...rest }) => (
    <div>
      ComponentLoaderAndError Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock('../BarChart', () => ({ data }) => (
  <div>
    BarChart
    {JSON.stringify(data)}
  </div>
));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(
    obj => Object.entries(obj).length === 0 && obj.constructor === Object,
  ),
}));

describe('Lifestyle history Component', () => {
  const props = {
    getLifestyleHealthScoresHistory: jest.fn(),
    loading: false,
    errorState: false,
    healthScoresHistory: [{ score: 1, createdOn: 'Jan' }],
  };

  it('should match snapshot', () => {
    const Component = withIntl(withTheme(LifestyleHistory));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should call getLifestyleTips on mount', () => {
    const Component = withIntl(withTheme(LifestyleHistory));

    render(<Component {...props} />);

    expect(props.getLifestyleHealthScoresHistory).toHaveBeenCalled();
  });
});
