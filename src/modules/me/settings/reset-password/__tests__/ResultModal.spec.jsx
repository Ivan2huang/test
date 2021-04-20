/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import ResultModal from '../ResultModal';
import withIntl from '../../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../../uiComponents/Modal',
  () => ({ children, title, ...rest }) => (
    <div>
      Modal Component
      <div>{title}</div>
      <span>{mockPropsCapture(rest)}</span>
      <div>{children}</div>
    </div>
  ),
);

describe('ResultModal Component', () => {
  const props = {
    email: 'dummy@email.com',
    handleClose: jest.fn(),
    open: false,
  };
  const Component = withIntl(ResultModal);

  it('should match the snapshot when open is true', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when open is false', () => {
    const { container } = render(<Component {...props} open={false} />);

    expect(container).toMatchSnapshot();
  });
});
