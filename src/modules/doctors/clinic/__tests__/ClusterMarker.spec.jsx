/* eslint-disable react/prop-types,react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { render } from '@testing-library/react';
import ClusterMarker from '../ClusterMarker';

jest.mock(
  'react-google-maps/lib/components/addons/MarkerClusterer',
  () => ({ children, ...rest }) => (
    <>
      <div>
        {' '}
        {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
      </div>
      <div>{children}</div>
      <div>Dummy Cluster Marker, Number of clinics </div>
    </>
  ),
);

jest.mock('../MapPins', () => ({ clinics, ...rest }) => (
  <>
    <div {...rest}>Dummy Map Pins</div>
    Number of clinics:
    {clinics.length}
  </>
));

jest.mock('../../../../constants/images', () => ({
  CLUSTERED_LOCATION: '/static/clustered_locations.png',
}));

describe('ClusterMarker', () => {
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
    const { container } = render(<ClusterMarker {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with selected pin', () => {
    const selectedClinic = {
      id: '123',
      name: 'Dr Test Clinic',
      latitude: 1.3006643,
      longitude: 103.8001065,
    };
    const { container } = render(
      <ClusterMarker {...props} selectedClinic={selectedClinic} />,
    );

    expect(container).toMatchSnapshot();
  });
});
