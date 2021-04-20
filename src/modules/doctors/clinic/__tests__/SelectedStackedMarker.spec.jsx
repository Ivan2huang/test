/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import SelectedStackedMarker from '../SelectedStackedMarker';

jest.mock(
  'react-google-maps/lib/components/addons/MarkerClusterer',
  () => ({ children, ...rest }) => (
    <>
      <div>
        {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
      </div>
      <span>{rest.styles[0].url}</span>
      <div>{children}</div>
      <div>Dummy Cluster Marker, Number of clinics </div>
    </>
  ),
);

jest.mock('../MapPins', () => ({ clinics, ...rest }) => (
  <div>
    Dummy Map pins:
    {clinics.length}
    <span data-id="props">
      {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../../../../constants/images', () => ({
  STACKED_ACTIVE_LOCATIONS: '/static/stacked_active_locations.png',
}));

describe('SelectedStackedMarker', () => {
  it('should match the snapshot', () => {
    const props = {
      selectedStackedClinics: [
        {
          id: '123',
          name: 'Dr Test Clinic',
          latitude: 3.3006643,
          longitude: 103.8001065,
        },
        {
          id: '124',
          name: 'Dr Clinic Wang',
          latitude: 3.3006644,
          longitude: 103.8001066,
        },
      ],
    };

    const { container } = render(<SelectedStackedMarker {...props} />);

    expect(container).toMatchSnapshot();
  });
});
