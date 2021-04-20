/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';
import PersonInfoDependent from '../PersonInfoDependent';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('PersonInfoDependent Component', () => {
  it('should match the snapshot', () => {
    const props = {
      fields: [
        {
          label: 'Name',
          value: 'Helen Tan',
          editable: false,
          addable: false,
        },
        {
          label: 'Relationship',
          value: 'Spouse',
          editable: false,
          addable: false,
        },
      ],
    };
    const Component = withIntl(withTheme(PersonInfoDependent));
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
