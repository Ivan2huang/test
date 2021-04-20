import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import TrackingFab from '../TrackingFab';
import { logAction } from '../../helpers/firebase';

jest.mock('../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

describe('TrackingFab component', () => {
  it('should not call log action if have not tracking data', async () => {
    const { getByText } = render(<TrackingFab>Click</TrackingFab>);
    const clickButton = getByText('Click');
    fireEvent.click(clickButton);
    await wait(() => {
      expect(logAction).not.toHaveBeenCalled();
    });
  });
  
  it('should call log action if have tracking data', async () => {
    const { getByText } = render(
      <TrackingFab
        trackingData={{
          category: 'category',
          action: 'action',
        }}
      >
        Click
      </TrackingFab>,
    );
    const clickButton = getByText('Click');
    fireEvent.click(clickButton);

    await wait(() => {
      expect(logAction).toHaveBeenCalled();
    });
  });
});
