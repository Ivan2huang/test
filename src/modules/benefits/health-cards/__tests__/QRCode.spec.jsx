/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import QRCode from '../QRCode';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('qrcode.react', () => props => (
  <div>
    QR Code React Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

jest.mock(
  '../../../../uiComponents/Modal',
  () => ({ children, title, ...rest }) => (
    <div>
      Modal Component
      <div>{title}</div>
      <span>{mockPropsCapture(rest)}</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('QRCode Component', () => {
  const props = {
    title: 'Markus Tan',
    value: '<xml><name>Markus Tan</name></xml>',
    open: true,
    onClose: jest.fn(),
  };
  const setUp = (componentProps = props) => {
    const Component = withIntl(QRCode);
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });
});
