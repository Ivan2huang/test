import React from 'react';
import { render } from '@testing-library/react';
import NoClaimsDependent from '../NoClaimsDependent';
import withIntl from '../../../i18n/withIntlProvider';

jest.mock('../../../uiComponents/Typography', () => props => (
  <div {...props}>Dummy Typography</div>
));

jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

let Component;

describe('No Claims dependent component', () => {
  beforeEach(() => {
    Component = withIntl(NoClaimsDependent);
  });
  it('should match the snapshot', () => {
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
