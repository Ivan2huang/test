/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import NotificationBox from '../NotificationBox.balboa';

jest.mock('../Box', () => ({ className, children }) => (
  <div className={className}>{children}</div>
));

jest.mock('../../../constants/config', () => jest.fn());

describe('Balboa Notification component', () => {
  it('should match the snapshot', () => {
    const { container } = render(<NotificationBox>Children</NotificationBox>);
    expect(container).toMatchSnapshot();
  });
});
