import React from 'react';
import PropTypes from 'prop-types';

import ClusterMarker from './ClusterMarker';
import StackedMarkerContainer from './StackedMarkerContainer';

const ClusterMapMarker = ({ clinics, showClusterMarker }) => {
  if (showClusterMarker) {
    return <ClusterMarker clinics={clinics} />;
  }

  return <StackedMarkerContainer clinics={clinics} />;
};

ClusterMapMarker.propTypes = {
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showClusterMarker: PropTypes.bool.isRequired,
};

function areEquals(p, n) {
  if (p.selectedClinic && n.selectedClinic) {
    return (
      n.selectedClinic.id === p.selectedClinic.id &&
      p.showClusterMarker === n.showClusterMarker
    );
  }
  return false;
}

export default React.memo(ClusterMapMarker, areEquals);
