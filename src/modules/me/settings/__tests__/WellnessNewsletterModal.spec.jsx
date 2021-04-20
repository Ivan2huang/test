/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../../../themes/withThemeProvider';

import WellnessNewsletterModal from '../WellnessNewsletterModal';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('WellnessNewsletterModal Component', () => {
  const props = {
    handleClose: jest.fn(),
    open: true,
    content: 'content',
  };
  const Component = withTheme(withIntl(WellnessNewsletterModal));

  it('should match the snapshot when open', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when closed', () => {
    const { container } = render(<Component {...props} open={false} />);

    expect(container).toMatchSnapshot();
  });
});
