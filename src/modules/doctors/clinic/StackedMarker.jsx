import React from 'react';
import PropTypes from 'prop-types';

import NonSelectedStackedMarker from './NonSelectedStackedMarker';
import SelectedStackedMarker from './SelectedStackedMarker';

const StackedMarker = ({
  clinics,
  selectedStackedClinics,
  setStackedClinics,
}) => {
  const getNonSelectedMarker = () => {
    if (selectedStackedClinics.length === 0) {
      return clinics;
    }
    return clinics.filter(clinic => {
      return !selectedStackedClinics.find(
        selectedStackedClinic => selectedStackedClinic.id === clinic.id,
      );
    });
  };
  return (
    <>
      <NonSelectedStackedMarker
        clinics={getNonSelectedMarker()}
        setStackedClinics={setStackedClinics}
      />
      <SelectedStackedMarker selectedStackedClinics={selectedStackedClinics} />
    </>
  );
};

StackedMarker.propTypes = {
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedStackedClinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setStackedClinics: PropTypes.func.isRequired,
};

export default StackedMarker;
