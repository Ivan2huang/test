import React from 'react';
import PropTypes from 'prop-types';

import ClinicMarkerContainer from './ClinicMarkerContainer';

const MapPins = ({ clinics }) => {
  return (
    <>
      {clinics.map(clinic => {
        return <ClinicMarkerContainer key={clinic.id} clinic={clinic} />;
      })}
    </>
  );
};

MapPins.propTypes = {
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MapPins;
