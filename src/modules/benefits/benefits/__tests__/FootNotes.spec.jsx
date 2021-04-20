/* eslint-disable eslint-disable-next-line,react/no-array-index-key,react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { render } from '@testing-library/react';

import FootNotes from '../FootNotes';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'md'),
}));
jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('FootNotes component', () => {
  it('should match snapshot', () => {
    const props = {
      footNotes: ['Dummy Data 1', 'Dummy Data 2', 'Dummy Data 3'],
      footNotesHalf: 1,
    };
    const Component = withIntl(FootNotes);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
