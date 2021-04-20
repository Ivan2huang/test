import React from 'react';

import { render } from '@testing-library/react';
import withIntl from '../../../../../../i18n/withIntlProvider';
import withRedux from '../../../../../../redux/withReduxProvider';

import UpdateEmail from '../UpdateEmail';

jest.mock(
  '../../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock(
  '../../../../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

describe('UpdateEmail Component', () => {
  it('should match snapshot', () => {
    const Component = withRedux(withIntl(UpdateEmail));
    const props = {
      profile: {
        role: 'Employee',
        memberId: 1,
        fullName: 'test name',
        dependants: [
          {
            memberId: 2,
            fullName: 'test name 2',
          },
          {
            memberId: 3,
            fullName: 'test name 3',
          },
        ],
      },
      changePersonalEmail: jest.fn(),
    };
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
