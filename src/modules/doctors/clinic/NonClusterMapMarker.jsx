import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import Images from '../../../constants/images';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const NonClusterMapMarker = ({ clinics, selectedClinic, selectPin }) => (
  <>
    {clinics
      .filter(
        clinic =>
          (!selectedClinic || clinic.id !== selectedClinic.id) &&
          clinic.latitude &&
          clinic.longitude,
      )
      .map(clinic => {
        return (
          <Marker
            noRedraw
            index={clinic.id}
            key={clinic.id}
            position={{ lat: clinic.latitude, lng: clinic.longitude }}
            options={{ icon: { url: `${Images.CLINIC_LOCATION}` } }}
            onClick={() => {
              selectPin(clinic);
              logAction({
                category: CATEGORIES.PANEL_CLINIC_PAGE,
                action: 'Select clinic on map',
              });
            }}
          />
        );
      })}
    {selectedClinic.id && selectedClinic.latitude && selectedClinic.longitude && (
      <Marker
        index={selectedClinic.id}
        position={{
          lat: selectedClinic.latitude,
          lng: selectedClinic.longitude,
        }}
        options={{
          icon: { url: `${Images.SELECTED_CLINIC_LOCATION}` },
        }}
      />
    )}
  </>
);

NonClusterMapMarker.propTypes = {
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedClinic: PropTypes.shape({}).isRequired,
  selectPin: PropTypes.func.isRequired,
};

export default NonClusterMapMarker;
