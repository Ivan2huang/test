/* eslint-disable react/prop-types,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NonClusterMapMarker from '../NonClusterMapMarker';

jest.mock('react-google-maps', () => ({
  Marker: ({ index, position, options, onClick, ...rest }) => (
    <div {...position} {...options}>
      Marker
      {options.icon.url}
      <div data-testid={`map-pin-${index}`} onClick={onClick} />
      <span data-id="props">
        {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
      </span>
    </div>
  ),
}));

jest.mock('../../../../constants/images', () => ({
  CLINIC_LOCATION: '/static/inactive_locations.png',
  SELECTED_CLINIC_LOCATION: '/static/active_locations.png',
}));

describe('NonClusterMapMarker component', () => {
  const defaultProps = {
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
    selectedClinic: {},
    selectPin: jest.fn(),
  };

  const setUp = (props = defaultProps) => {
    return render(<NonClusterMapMarker {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should be able to match the snapshot with selected clinic', () => {
    const selectedClinic = {
      id: '124',
      name: 'Dr Clinic Wang',
      latitude: 3.3006643,
      longitude: 109.8001065,
    };
    const newProps = { ...defaultProps, selectedClinic };

    const { container } = render(<NonClusterMapMarker {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should be able to select the unselected pin', () => {
    const { getByTestId } = setUp();
    const unSelectedPin = getByTestId('map-pin-123');
    const expected = {
      id: '123',
      name: 'Dr Test Clinic',
      latitude: 1.3006643,
      longitude: 103.8001065,
    };
    fireEvent.click(unSelectedPin);

    expect(defaultProps.selectPin).toHaveBeenCalledTimes(1);
    expect(defaultProps.selectPin).toHaveBeenCalledWith(expected);
  });

  it('should not trigger select pin method when selected pin is selected', () => {
    const selectedClinic = {
      id: '124',
      name: 'Dr Clinic Wang',
      latitude: 3.3006643,
      longitude: 109.8001065,
    };
    const newProps = { ...defaultProps, selectedClinic };
    const { getByTestId } = render(<NonClusterMapMarker {...newProps} />);
    const selectedPin = getByTestId('map-pin-124');

    fireEvent.click(selectedPin);

    expect(defaultProps.selectPin).not.toHaveBeenCalledTimes(1);
  });
});
