/* eslint-disable react/prop-types,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NonSelectedStackedMarker from '../NonSelectedStackedMarker';

jest.mock(
  'react-google-maps/lib/components/addons/MarkerClusterer',
  () => ({ children, ...rest }) => (
    <>
      <div>
        {Object.entries(rest).map(([key, value]) =>
          key === 'onClick' ? `${key} = ${value.name}` : `${key} = ${value}`,
        )}
      </div>
      <span>{rest.styles[0].url}</span>
      <div>{children}</div>
      <div>Dummy Cluster Marker, Number of clinics </div>
      <div
        data-testid="dummyTestButton"
        onClick={() =>
          rest.onClick({
            getMarkers: jest.fn(() => [
              {
                position: {
                  lat: jest.fn(() => 3.3006643),
                  lng: jest.fn(() => 103.8001065),
                },
              },
              {
                position: {
                  lat: jest.fn(() => 3.3006644),
                  lng: jest.fn(() => 103.8001065),
                },
              },
            ]),
          })
        }
      />
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
  STACKED_INACTIVE_LOCATIONS: '/static/stacked_inactive_locations.png',
}));

describe('NonSelectedStackedMarker', () => {
  const props = {
    clinics: [
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
    setStackedClinics: jest.fn(),
  };

  const setUp = () => {
    return render(<NonSelectedStackedMarker {...props} />);
  };
  it('should match the snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should handle click on non selected stacked pin', () => {
    const { getByTestId } = setUp();
    const selectedMarker = getByTestId('dummyTestButton');
    const expected = [
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
    ];

    fireEvent.click(selectedMarker);

    expect(props.setStackedClinics).toHaveBeenCalledTimes(1);
    expect(props.setStackedClinics).toHaveBeenCalledWith(expected);
  });
});
