/* eslint-disable react/prop-types, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions,react/self-closing-comp,react/button-has-type,global-require,no-return-assign,react/jsx-one-expression-per-line */
import React from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import { fireEvent, render, wait } from '@testing-library/react';
import PropTypes from 'prop-types';

import Map from '../Map';
import withIntl from '../../../../i18n/withIntlProvider';
import { enabledFeatureToggledForClusteredMap } from '../../../../constants/config';

jest.mock('react-google-maps', () => ({
  withScriptjs: Component => props => (
    <div>
      With Script JS
      <Component {...props} />
    </div>
  ),
  withGoogleMap: Component => ({
    googleMapURL,
    loadingElement,
    containerElement,
    mapElement,
    ...rest
  }) => (
    <div>
      With Google Map
      {googleMapURL}
      {loadingElement}
      {containerElement}
      {mapElement}
      <Component {...rest} />
    </div>
  ),
  GoogleMap: ({ children, center, ...rest }) => (
    <div>
      {Object.entries(rest).map(([key, value]) =>
        key === 'onZoomChanged'
          ? `${key} = ${value.name}`
          : `${key} = ${value}`,
      )}
      Google Map
      {`Center (lat: ${center.lat}, lng: ${center.lng})`}
      {children}
      <div data-testid="dummyTestButton" onClick={rest.onZoomChanged} />
    </div>
  ),
  Marker: ({ index, position, options, onClick }) => (
    <div {...position} {...options}>
      Marker
      {options.icon.url}
      <div data-testid={`map-pin-${index}`} onClick={onClick} />
    </div>
  ),
}));

jest.mock('../CustomMapControl', () => ({ children, ...rest }) => (
  <div>
    Custom Map Control
    {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
    {children}
  </div>
));

jest.mock(
  '../../../../uiComponents/Toast',
  () => ({ message, handleClose, open, ...rest }) => (
    <div data-testid="no-location-access-toast" data-open={open} {...rest}>
      {message}
      <div data-testid="no-location-access-toast-close" onClick={handleClose}>
        Close
      </div>
    </div>
  ),
);

jest.mock('../mapConfig', () => ({
  DEFAULT_LOCATION: {
    lat: 12,
    lng: 30,
  },
  DEFAULT_MAP_OPTIONS: {
    disableDefaultUI: true,
    zoomControl: true,
  },
  DEFAULT_ZOOM: 10,
  MINIMUM_ZOOM_ON_SEARCH: 2,
  MAP_CONTROL_POSITIONS: {
    myLocationIcon() {
      return 3;
    },
  },
}));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../helpers/networkCheck', () => jest.fn(() => {}));

jest.mock('../ClusterMapMarker', () => props => (
  <div>
    Dummy ClusterMapComponent
    {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
  </div>
));

jest.mock('../NonClusterMapMarkerContainer', () => ({ clinics }) => (
  <div>Dummy NonClusterMapMarkerContainer with clinics :{clinics.length}</div>
));

jest.mock('../../../../constants/config', () => {
  return {
    __esModule: true,
    default: {
      defaultLanguage: 'en',
    },
    enabledFeatureToggledForClusteredMap: jest.fn(),
  };
});

const extend = jest.fn();
const fitBounds = jest.fn();
const getCenter = jest.fn();
const setCenter = jest.fn();
const getZoom = jest.fn(() => 5);
const setZoom = jest.fn();
class MapComponent extends React.Component {
  getChildContext() {
    return {
      [MAP]: {
        controls: [[]],
        fitBounds,
        getCenter,
        setCenter,
        getZoom,
        setZoom,
      },
    };
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
MapComponent.childContextTypes = {
  [MAP]: PropTypes.shape({}),
};

describe('Map Component', () => {
  const props = {
    googleMapURL: `testing-map-url`,
    loadingElement: <div>Loading</div>,
    containerElement: <div>Container</div>,
    mapElement: <div>Map</div>,
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
    view: 'map',
    showClinicDetail: false,
    selectedClinic: {},
    fitMapToOriginalPosition: false,
    selectedClinicFromSearchResultPanel: false,
    setFitMapToOriginalPosition: jest.fn(),
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  let Component;
  const setup = (componentProps = props) => {
    const ComponentWithIntl = withIntl(Map);
    Component = p => (
      <MapComponent>
        <ComponentWithIntl {...p} />
      </MapComponent>
    );
    return render(<Component {...componentProps} />);
  };
  describe('with clustered map view feature toggale on', () => {
    beforeEach(() => {
      enabledFeatureToggledForClusteredMap.mockReturnValue(true);
    });
    it('should not fit bound clinic locations when there are no clinics', async () => {
      const newProps = {
        ...props,
        clinics: [],
      };
      setup(newProps);

      await wait(() => expect(fitBounds).toHaveBeenCalledTimes(0));
    });

    it('should fit map to original position when fitMapToOriginalPosition is true', async () => {
      const newProps = {
        ...props,
        fitMapToOriginalPosition: true,
      };
      window.google = {
        maps: {
          LatLngBounds: jest.fn().mockImplementation(() => {
            return { extend };
          }),
        },
      };
      setup(newProps);

      await wait(() => expect(getZoom).toHaveBeenCalledTimes(3));
      await wait(() =>
        expect(newProps.setFitMapToOriginalPosition).toHaveBeenCalled(),
      );
    });

    it('should fit map to original position when fitMapToOriginalPosition is true and clinic details enabled', async () => {
      const newProps = {
        ...props,
        showClinicDetail: true,
        fitMapToOriginalPosition: true,
      };
      window.google = {
        maps: {
          LatLngBounds: jest.fn().mockImplementation(() => {
            return { extend };
          }),
        },
      };
      setup(newProps);

      await wait(() => expect(getZoom).toHaveBeenCalledTimes(2));
      await wait(() =>
        expect(newProps.setFitMapToOriginalPosition).toHaveBeenCalled(),
      );
    });

    it('should call fit bound on map for given clinic locations', async () => {
      window.google = {
        maps: {
          LatLngBounds: jest.fn().mockImplementation(() => {
            return { extend };
          }),
        },
      };

      setup();

      await wait(() => expect(fitBounds).toHaveBeenCalledTimes(2));
    });

    it('should default to minimum zoom level on search if fitbound results in lesser zoom level', async () => {
      getZoom.mockReturnValue(1);
      window.google = {
        maps: {
          LatLngBounds: jest.fn().mockImplementation(() => {
            return { extend };
          }),
        },
      };

      setup();

      await wait(() => expect(getCenter).toHaveBeenCalledTimes(2));
      await wait(() => expect(setCenter).toHaveBeenCalledTimes(2));
      await wait(() => expect(getZoom).toHaveBeenCalledTimes(2));
      await wait(() => expect(setZoom).toHaveBeenCalledTimes(2));
      await wait(() => expect(setZoom).toHaveBeenCalledWith(2));
    });

    it('should match snapshot', () => {
      window.google = {
        maps: {
          LatLngBounds: jest.fn().mockImplementation(() => {
            return { extend };
          }),
        },
      };
      const { container, getByTestId } = setup();

      const ele = getByTestId('dummyTestButton');
      fireEvent.click(ele);

      expect(container).toMatchSnapshot();
    });

    it('should center to current Location on my location click', () => {
      window.navigator.geolocation = {
        getCurrentPosition: jest.fn(success =>
          success({ coords: { latitude: 12, longitude: 23 } }),
        ),
      };

      const { container, getByTestId } = setup();
      const myLocation = getByTestId('img-my-location');

      fireEvent.click(myLocation);

      expect(container).toMatchSnapshot();
    });

    it('should not show current location when clinics are updated', () => {
      const newProps = {
        ...props,
        clinics: [
          {
            id: '124',
            name: 'Dr Test Clinic',
            latitude: 1.3006643,
            longitude: 103.8001065,
          },
          {
            id: '125',
            name: 'Er Test Clinic',
            latitude: 2.3006643,
            longitude: 105.8001065,
          },
        ],
      };

      window.navigator.geolocation = {
        getCurrentPosition: jest.fn(success =>
          success({ coords: { latitude: 12, longitude: 23 } }),
        ),
      };

      const { container, getByTestId, rerender } = setup();
      const myLocation = getByTestId('img-my-location');

      fireEvent.click(myLocation);
      rerender(<Component {...newProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should display the snack bar with message with location service denied', () => {
      window.navigator.geolocation = {
        getCurrentPosition: jest.fn((success, error) => error()),
      };
      const { container, getByTestId } = setup();
      const myLocation = getByTestId('img-my-location');

      fireEvent.click(myLocation);

      expect(container).toMatchSnapshot();
    });

    it('should close snackbar when it is closed by clickin on cross', () => {
      window.navigator.geolocation = {
        getCurrentPosition: jest.fn((success, error) => error()),
      };
      const { container, getByTestId } = setup();

      const centerToMyLocation = getByTestId('img-my-location');
      const closeToast = getByTestId('no-location-access-toast-close');
      const isToastOpen = getByTestId('no-location-access-toast').getAttribute(
        'data-open',
      );

      fireEvent.click(centerToMyLocation);
      fireEvent.click(closeToast);

      expect(isToastOpen).toBe('false');
      expect(container).toMatchSnapshot();
    });

    it('should not show current location when clinic is selected', () => {
      window.navigator.geolocation = {
        getCurrentPosition: jest.fn(success =>
          success({ coords: { latitude: 12, longitude: 23 } }),
        ),
      };
      const newProps = {
        ...props,
        selectedClinic: {
          id: '123',
          name: 'Dr Test Clinic',
          latitude: 1.3006643,
          longitude: 103.8001065,
        },
      };
      const { container, rerender, getByTestId } = setup();

      // show current location
      const myLocation = getByTestId('img-my-location');
      fireEvent.click(myLocation);

      // un-select selected clinic
      rerender(<Component {...newProps} />);

      // snapshot shouldn't have show current location marker
      expect(container).toMatchSnapshot();
    });

    it('should not center to current location when location is undefined', () => {
      Object.defineProperty(global, 'navigator', {
        value: undefined,
      });
      const { container, getByTestId } = setup();
      const myLocation = getByTestId('img-my-location');

      fireEvent.click(myLocation);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a clinic is selected', () => {
      window.google = {
        maps: {
          LatLngBounds: jest.fn().mockImplementation(() => {
            return { extend };
          }),
        },
      };

      const newProps = {
        ...props,
        selectedClinic: {
          id: '123',
          name: 'Dr Test Clinic',
          latitude: 1.3006643,
          longitude: 103.8001065,
        },
        selectedClinicFromSearchResultPanel: true,
      };
      const { container } = setup(newProps);

      expect(container).toMatchSnapshot();
      expect(setZoom).toHaveBeenCalledWith(22);
    });

    it('should match snapshot when a clinic is selected and selected clinic is not present in all clinics', () => {
      window.google = {
        maps: {
          LatLngBounds: jest.fn().mockImplementation(() => {
            return { extend };
          }),
        },
      };

      const newProps = {
        ...props,
        selectedClinic: {
          id: '126',
          name: 'Dr Not present',
          latitude: 6.3006643,
          longitude: 113.8001065,
        },
      };
      const { container } = setup(newProps);

      expect(container).toMatchSnapshot();
    });
  });
  describe('with clustered map view feature toggale off', () => {
    beforeEach(() => {
      enabledFeatureToggledForClusteredMap.mockReturnValue(false);
    });

    it('should match snapshot', () => {
      const { container } = setup();

      expect(container).toMatchSnapshot();
    });
  });
});
