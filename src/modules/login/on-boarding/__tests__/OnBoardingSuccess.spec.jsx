/* eslint-disable react/prop-types */

import { render } from '@testing-library/react';
import React from 'react';

import OnBoardingSuccess from '../OnBoardingSuccess';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../helpers/paths', () => ({
  common: {
    login: '/login',
  },
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock(
  '../../../../uiComponents/ButtonGroup',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      <span>Button Group Component</span>
      {children}
    </div>
  ),
);

describe('OnBoardingSuccess Component', () => {
  const props = {
    router: {
      query: {
        productName: 'dummy',
      },
    },
    productName: 'dummy',
    getProductName: jest.fn(),
  };
  const setUp = (componentProps = {}) => {
    const Component = withIntl(withTheme(OnBoardingSuccess));
    return render(<Component {...componentProps} />);
  };

  it('should match the snapshot', () => {
    const { container } = setUp(props);

    expect(container).toMatchSnapshot();
  });
});
