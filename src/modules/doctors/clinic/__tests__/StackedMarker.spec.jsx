/* eslint-disable react/prop-types,react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/jsx-indent */
import React from 'react';
import { render } from '@testing-library/react';

import StackedMarker from '../StackedMarker';

jest.mock('../SelectedStackedMarker', () => ({ selectedStackedClinics }) => (
  <div>Dummy Selected stacked clinics {selectedStackedClinics.length}</div>
));

jest.mock(
  '../NonSelectedStackedMarker',
  () => ({ clinics, setStackedClinics }) => (
    <>
      <div>Dummy Non Selected stacked clinics {clinics.length}</div>
      {setStackedClinics.name}
    </>
  ),
);

describe('StackedMarker', () => {
  const defaultProps = {
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
      {
        id: '125',
        name: 'Dr Dummy',
        latitude: 4.3006644,
        longitude: 83.8001066,
      },
    ],
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
    setStackedClinics: jest.fn(),
  };

  const setUp = (props = defaultProps) => {
    return render(<StackedMarker {...props} />);
  };
  it('should match the snapshot with non empty stacked clinics', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with empty stacked clinics', () => {
    const newProps = { ...defaultProps, selectedStackedClinics: [] };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });
});
