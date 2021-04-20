import React from 'react';
import * as PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import Images from '../../../constants/images';

const ClinicMarker = ({ clinic, selectedClinic, setSelectedClinic }) => {
  return (
    <Marker
      noRedraw
      icon={
        selectedClinic.id === clinic.id
          ? Images.SELECTED_CLINIC_LOCATION
          : Images.CLINIC_LOCATION
      }
      index={clinic.id}
      key={clinic.id}
      position={{ lat: clinic.latitude, lng: clinic.longitude }}
      onClick={() => setSelectedClinic(clinic)}
    />
  );
};

ClinicMarker.propTypes = {
  clinic: PropTypes.shape({}).isRequired,
  selectedClinic: PropTypes.shape({}).isRequired,
  setSelectedClinic: PropTypes.func.isRequired,
};

export default ClinicMarker;
