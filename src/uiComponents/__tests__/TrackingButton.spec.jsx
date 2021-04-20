import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import TrackingButton from '../TrackingButton';
import { logAction } from '../../helpers/firebase';

jest.mock('../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

const clickHandle = jest.fn();

describe('TrackingButton component', () => {
  it('should not call log action if have not tracking data', async () => {
    const { getByText } = render(<TrackingButton>Click</TrackingButton>);
    const clickButton = getByText('Click');
    fireEvent.click(clickButton);
    await wait(() => {
      expect(logAction).not.toHaveBeenCalled();
    });
  });

  it('should call log action if have tracking data', async () => {
    const { getByText } = render(
      <TrackingButton
        trackingData={{
          category: 'category',
          action: 'action',
        }}
        onClick={clickHandle}
      >
        Click
      </TrackingButton>,
    );
    const clickButton = getByText('Click');
    fireEvent.click(clickButton);

    await wait(() => {
      expect(clickHandle).toHaveBeenCalled();
      expect(logAction).toHaveBeenCalled();
    });
  });
});
