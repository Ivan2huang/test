import React from 'react';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import PropTypes from 'prop-types';

import Images from '../../../constants/images';
import MapPins from './MapPins';

const CLUSTER_MARKER_STYLES = [
  {
    height: 48,
    width: 48,
    url: `${Images.CLUSTERED_LOCATIONS}`,
    textColor: '#212121',
    textSize: '14',
  },
];

const ClusterMarker = ({ clinics }) => {
  return (
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      styles={CLUSTER_MARKER_STYLES}
    >
      <MapPins clinics={clinics} />
    </MarkerClusterer>
  );
};

ClusterMarker.propTypes = {
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default React.memo(ClusterMarker);
