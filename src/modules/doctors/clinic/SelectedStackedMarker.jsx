/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Images from '../../../constants/images';
import MapPins from './MapPins';

const ACTIVE_STACKED_MARKER_STYLES = [
  {
    url: `${Images.STACKED_ACTIVE_LOCATIONS}`,
    height: 36,
    width: 33,
    textColor: 'white',
    textSize: '14',
  },
];

const SelectedStackedMarker = ({ selectedStackedClinics }) => {
  return (
    <MarkerClusterer
      zoomOnClick={false}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      styles={ACTIVE_STACKED_MARKER_STYLES}
    >
      <MapPins clinics={selectedStackedClinics} />
    </MarkerClusterer>
  );
};

SelectedStackedMarker.propTypes = {
  selectedStackedClinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SelectedStackedMarker;
