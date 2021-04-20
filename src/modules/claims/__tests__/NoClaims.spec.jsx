import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NoClaims from '../NoClaims';
import { navigateTo } from '../../../helpers/helpers';
import withIntl from '../../../i18n/withIntlProvider';

jest.mock('../../../uiComponents/Typography', () => props => (
  <div {...props}>Dummy Typography</div>
));
jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../helpers/paths', () => ({
  employee: {
    makeClaim: 'make-claim-path',
  },
}));
let Component;

describe('No Claims component', () => {
  beforeEach(() => {
    Component = withIntl(NoClaims);
  });
  it('should match the snapshot', () => {
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to Make claim page on make claim button click', () => {
    const { getByTestId } = render(<Component />);
    const makeClaimButton = getByTestId('btn-make-claim');

    fireEvent.click(makeClaimButton);

    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('make-claim-path');
  });
});
