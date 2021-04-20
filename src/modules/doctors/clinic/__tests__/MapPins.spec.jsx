/* eslint-disable react/prop-types,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import { render } from '@testing-library/react';
import MapPins from '../MapPins';

jest.mock('../ClinicMarkerContainer', () => ({ clinic }) => (
  <div>
    Dummy ClinicMarker Container with clinics:
    {clinic.id}
  </div>
));

describe('MapPins component', () => {
  const props = {
    clinics: [
      {
        id: '123',
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
      },
      {
        id: '124',
        name: 'Dr Clinic Wang',
        latitude: 3.3006643,
        longitude: 109.8001065,
      },
    ],
  };

  it('should match the snapshot', () => {
    const { container } = render(<MapPins {...props} />);

    expect(container).toMatchSnapshot();
  });
});
