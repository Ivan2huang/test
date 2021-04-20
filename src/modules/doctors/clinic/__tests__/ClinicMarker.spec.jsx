/* eslint-disable react/prop-types,jsx-a11y/no-static-element-interactions,react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClinicMarker from '../ClinicMarker';

jest.mock('react-google-maps', () => ({
  Marker: ({ icon, index, position, onClick, ...rest }) => (
    <div {...position}>
      Marker icon : {icon}
      index: {index}
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

describe('ClinicMarker Component', () => {
  const defaultProps = {
    clinic: { id: 100 },
    selectedClinic: {},
    setSelectedClinic: jest.fn(),
  };
  const setUp = (props = defaultProps) => {
    return render(<ClinicMarker {...props} />);
  };

  it('should match the snapshot when no clinic is being selected', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when clinic is already selected', () => {
    const newProps = {
      ...defaultProps,
      selectedClinic: { id: 100 },
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should be able to handle click event', () => {
    const { getByTestId } = setUp();
    const clinicPin = getByTestId('map-pin-100');
    fireEvent.click(clinicPin);

    expect(defaultProps.setSelectedClinic).toHaveBeenCalledTimes(1);
    expect(defaultProps.setSelectedClinic).toHaveBeenCalledWith({ id: 100 });
  });
});
