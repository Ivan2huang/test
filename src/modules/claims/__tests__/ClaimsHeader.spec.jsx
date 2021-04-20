import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { navigateTo } from '../../../helpers/helpers';
import withIntl from '../../../i18n/withIntlProvider';
import ClaimsHeader from '../ClaimsHeader';

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

describe('ClaimsHeader Component', () => {
  let result;

  beforeEach(() => {
    const Component = withIntl(ClaimsHeader);
    result = render(<Component />);
  });

  it('should match snapshot', () => {
    expect(result.container).toMatchSnapshot();
  });

  it('should navigate to Make claim page on make claim button click', () => {
    const makeClaimButton = result.getByTestId('btn-make-claim');

    fireEvent.click(makeClaimButton);

    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('make-claim-path');
  });
});
