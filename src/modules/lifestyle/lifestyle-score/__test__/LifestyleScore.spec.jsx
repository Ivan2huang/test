/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import LifestyleScore from '../LifestyleScore';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../../uiComponents/Grid', () => ({ children, ...rest }) => (
  <div>
    Grid Component
    <span>{mockPropsCapture(rest)}</span>
    {children}
  </div>
));

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ children, ...rest }) => (
    <div>
      GridItem Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      (Typography)
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

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

jest.mock('../LifestyleScoreChart', () => props => (
  <div>
    LifestyleScoreChart component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

describe('LifestyleScore Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    healthScore: 42,
    getLifestyleHealthScore: jest.fn(),
    loading: true,
    errorState: true,
  };
  const Component = withTheme(withIntl(LifestyleScore));

  const setUp = (componentProps = props) => {
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should call getLifestyleScore exactly once on first time render', () => {
    const { rerender } = setUp();

    expect(props.getLifestyleHealthScore).toHaveBeenCalledTimes(1);
    rerender(<Component {...props} />);
    expect(props.getLifestyleHealthScore).toHaveBeenCalledTimes(1);
  });
});
