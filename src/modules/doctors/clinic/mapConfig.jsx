import React from 'react';

import CONFIG from '../../../constants/config';

const MAP_CONFIG = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${CONFIG.googleMapApiKey}&v=3.exp&libraries=geometry,drawing,places`,
  loadingElement: <div />,
  containerElement: <div style={{ height: `100%` }} />,
  mapElement: <div style={{ height: `100%` }} />,
};

const DEFAULT_LOCATION = {
  lat: 22.266021,
  lng: 114.186422,
  latDelta: 0.2,
  lngDelta: 0.2,
};

const DEFAULT_MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
};

const DEFAULT_ZOOM = 15;

const MINIMUM_ZOOM_ON_SEARCH = 2;

const MAP_CONTROL_POSITIONS = {
  get myLocationIcon() {
    return window.google.maps.ControlPosition.TOP_RIGHT;
  },
};

export {
  MAP_CONFIG,
  DEFAULT_LOCATION,
  DEFAULT_MAP_OPTIONS,
  DEFAULT_ZOOM,
  MINIMUM_ZOOM_ON_SEARCH,
  MAP_CONTROL_POSITIONS,
};
