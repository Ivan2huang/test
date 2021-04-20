import React from 'react';
import { render } from '@testing-library/react';
import withIntl from '../../../i18n/withIntlProvider';
import ClaimsHeaderDependent from '../ClaimsHeaderDependent';

jest.mock('../../../uiComponents/Typography', () => props => (
  <div {...props}>Dummy Typography</div>
));

jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('ClaimsHeaderDependent Component', () => {
  let result;

  beforeEach(() => {
    const Component = withIntl(ClaimsHeaderDependent);
    result = render(<Component />);
  });

  it('should match snapshot', () => {
    expect(result.container).toMatchSnapshot();
  });
});
