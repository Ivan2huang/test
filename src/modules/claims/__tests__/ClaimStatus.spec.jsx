import React from 'react';
import { render } from '@testing-library/react';

import ClaimStatus from '../ClaimStatus';
import withIntl from '../../../i18n/withIntlProvider';
import withTheme from '../../../themes/withThemeProvider';

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('ClaimStatus Component', () => {
  it('should match snapshot for PROCESSING status', () => {
    const Component = withIntl(withTheme(ClaimStatus));
    const { container } = render(<Component status="PROCESSING" />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for REQUEST FOR INFORMATION status', () => {
    const Component = withIntl(withTheme(ClaimStatus));
    const { container } = render(
      <Component status="REQUEST FOR INFORMATION" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for APPROVED status', () => {
    const Component = withIntl(withTheme(ClaimStatus));
    const { container } = render(<Component status="APPROVED" />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for REJECTED status', () => {
    const Component = withIntl(withTheme(ClaimStatus));
    const { container } = render(<Component status="REJECTED" />);

    expect(container).toMatchSnapshot();
  });
});
