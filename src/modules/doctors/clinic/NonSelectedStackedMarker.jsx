import React from 'react';
import PropTypes from 'prop-types';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

import Images from '../../../constants/images';
import MapPins from './MapPins';

const INACTIVE_STACKED_MARKER_STYLES = [
  {
    url: `${Images.STACKED_INACTIVE_LOCATIONS}`,
    height: 36,
    width: 33,
    textColor: '#212121',
    textSize: '14',
  },
];

const filterClinics = (markers, clinics) => {
  return clinics.filter(clinic => {
    return markers.find(
      marker =>
        marker.position.lat().toFixed(4) === clinic.latitude.toFixed(4) &&
        marker.position.lng().toFixed(4) === clinic.longitude.toFixed(4),
    );
  });
};

const NonSelectedStackedMarker = ({ clinics, setStackedClinics }) => {
  const handleClick = event => {
    const selectedClinics = filterClinics(event.getMarkers(), clinics);
    setStackedClinics(selectedClinics);
  };
  return (
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      styles={INACTIVE_STACKED_MARKER_STYLES}
      onClick={handleClick}
    >
      <MapPins clinics={clinics} />
    </MarkerClusterer>
  );
};

NonSelectedStackedMarker.propTypes = {
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setStackedClinics: PropTypes.func.isRequired,
};

export default NonSelectedStackedMarker;
