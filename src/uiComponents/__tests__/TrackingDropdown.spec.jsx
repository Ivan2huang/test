import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import TrackingDropdown from '../TrackingDropdown';
import { logAction } from '../../helpers/firebase';

jest.mock('../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

const dropdownProps = {
  label: 'test label',
  items: [
    { id: '1', name: 'test1' },
    { id: '2', name: 'test2' },
    { id: '3', name: 'test3' },
  ],
  displayProperty: 'name',
  valueProperty: 'id',
  value: '1',
  testId: 'test-dropdown',
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

describe('TrackingDropdown component', () => {
  it('should not call log action if have not tracking data', async () => {
    const { container, getByText } = render(
      <TrackingDropdown {...dropdownProps} getTrackingData={() => null} />,
    );

    const dropdown = container.querySelector('#select-test-dropdown');
    fireEvent.click(dropdown);

    const item = getByText('test3');
    fireEvent.click(item);

    await wait(() => {
      expect(logAction).not.toHaveBeenCalled();
    });
  });

  it('should call log action if have tracking data', async () => {
    const { container, getByText } = render(
      <TrackingDropdown
        {...dropdownProps}
        getTrackingData={() => ({
          category: 'category',
          action: 'action',
        })}
      />,
    );

    const dropdown = container.querySelector('#select-test-dropdown');
    fireEvent.click(dropdown);

    const item = getByText('test3');
    fireEvent.click(item);

    await wait(() => {
      expect(logAction).toHaveBeenCalled();
    });
  });
});
