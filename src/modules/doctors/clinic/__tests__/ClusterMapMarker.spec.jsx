/* eslint-disable react/jsx-one-expression-per-line,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import ClusterMapMarker from '../ClusterMapMarker';

jest.mock('../ClusterMarker', () => ({ clinics, ...rest }) => (
  <div>
    <span>
      Dummy Cluster Marker with clinics: {clinics.length}
      {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../StackedMarkerContainer', () => ({ clinics, ...rest }) => (
  <div>
    <span>
      Dummy StackedCluster MarkerContainer: {clinics.length}
      {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('ClusterMapMarker', () => {
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
    showClusterMarker: true,
  };
  const setUp = (props = defaultProps) => {
    return render(<ClusterMapMarker {...props} />);
  };
  it('should match the snapshot with clusterMarkers when showClusterMarker is true', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with non selected stacked marker when showClusterMarker is false', () => {
    const newProps = {
      ...defaultProps,
      showClusterMarker: false,
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should not rerender when props are the same', () => {
    const { container, rerender } = setUp();

    rerender(<ClusterMapMarker {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should not rerender when props are the same and clinic is already selected', () => {
    const newProps = {
      ...defaultProps,
      selectedClinic: {
        id: '123',
        name: 'Dr Test Clinic',
        latitude: 1.3006643,
        longitude: 103.8001065,
      },
    };

    const { container, rerender } = setUp(newProps);

    rerender(<ClusterMapMarker {...newProps} />);

    expect(container).toMatchSnapshot();
  });
});
