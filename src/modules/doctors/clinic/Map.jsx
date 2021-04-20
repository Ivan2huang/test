/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { MAP } from 'react-google-maps/lib/constants';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import { Box, Hidden } from '@material-ui/core';

import Images from '../../../constants/images';
import CustomMapControl from './CustomMapControl';
import {
  DEFAULT_LOCATION,
  DEFAULT_MAP_OPTIONS,
  DEFAULT_ZOOM,
  MAP_CONTROL_POSITIONS,
  MINIMUM_ZOOM_ON_SEARCH,
} from './mapConfig';
import Toast from '../../../uiComponents/Toast';
import { formatMessage } from '../../../helpers/helpers';
import checkNetworkConnectivity from '../../../helpers/networkCheck';
import ClusterMapMarker from './ClusterMapMarker';
import { enabledFeatureToggledForClusteredMap } from '../../../constants/config';
import { VIEW } from './constants';
import NonClusterMapMarkerContainer from './NonClusterMapMarkerContainer';

const MAX_ZOOM_FOR_CLUSTERING = 22;

const Map = (
  {
    intl,
    clinics,
    view,
    showClinicDetail,
    selectedClinic,
    fitMapToOriginalPosition,
    selectedClinicFromSearchResultPanel,
    setFitMapToOriginalPosition,
  },
  context,
) => {
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
  const [showMyCurrentLocation, setShowMyCurrentLocation] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showClusterMarker, setShowClusterMarker] = useState(true);
  // eslint-disable-next-line react/destructuring-assignment
  const map = context[MAP];
  const closeSnackBar = () => {
    setOpenSnackbar(false);
  };

  const openSnackBar = () => {
    setOpenSnackbar(true);
  };

  const success = position => {
    setShowMyCurrentLocation(true);
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const error = () => {
    setShowMyCurrentLocation(false);
    openSnackBar();
  };

  const handleZoomChanged = () => {
    const currentZoom = map.getZoom();
    setShowClusterMarker(currentZoom < MAX_ZOOM_FOR_CLUSTERING);
  };

  const centerToMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(success, error);
    } else {
      openSnackBar();
    }
  };

  const fitAllClinicsToMapScreen = () => {
    if (showMyCurrentLocation) setShowMyCurrentLocation(false);
    setTimeout(() => {
      if (clinics && clinics.length) {
        const { google } = window;
        const bounds = new google.maps.LatLngBounds();
        clinics.forEach(clinic => {
          if (clinic.latitude && clinic.longitude) {
            bounds.extend({ lat: clinic.latitude, lng: clinic.longitude });
          }
        });
        map.fitBounds(bounds);
        if (map.getZoom() < 2) {
          const center = map.getCenter();
          map.setZoom(MINIMUM_ZOOM_ON_SEARCH);
          map.setCenter(center);
        }
      }
    });
  };

  if (fitMapToOriginalPosition) {
    fitAllClinicsToMapScreen();
    setFitMapToOriginalPosition(false);
  }

  useEffect(() => {
    checkNetworkConnectivity();
  }, []);

  useEffect(() => {
    fitAllClinicsToMapScreen();
  }, [clinics]);

  useEffect(() => {
    if (!showClinicDetail) {
      fitAllClinicsToMapScreen();
      setCurrentLocation(DEFAULT_LOCATION);
    }
  }, [showClinicDetail]);

  useEffect(() => {
    if (showMyCurrentLocation) setShowMyCurrentLocation(false);
    if (!enabledFeatureToggledForClusteredMap()) {
      if (selectedClinic.latitude && selectedClinic.longitude) {
        setCurrentLocation({
          lat: selectedClinic.latitude,
          lng: selectedClinic.longitude,
        });
      }
    }
    if (
      enabledFeatureToggledForClusteredMap() &&
      selectedClinicFromSearchResultPanel
    ) {
      if (selectedClinic.latitude && selectedClinic.longitude) {
        setCurrentLocation({
          lat: selectedClinic.latitude,
          lng: selectedClinic.longitude,
        });
        map.setZoom(MAX_ZOOM_FOR_CLUSTERING);
      }
    }
  }, [selectedClinic]);

  return (
    <Box
      implementation="css"
      smDown={showClinicDetail || view === VIEW.list}
      component={Hidden}
    >
      <GoogleMap
        defaultCenter={DEFAULT_LOCATION}
        defaultZoom={DEFAULT_ZOOM}
        defaultOptions={DEFAULT_MAP_OPTIONS}
        center={currentLocation}
        onZoomChanged={() => {
          handleZoomChanged();
        }}
      >
        {showMyCurrentLocation && (
          <Marker
            index="current-location"
            position={currentLocation}
            options={{ icon: { url: `${Images.LOCATION}` } }}
          />
        )}
        {enabledFeatureToggledForClusteredMap() ? (
          <ClusterMapMarker
            clinics={clinics}
            showClusterMarker={showClusterMarker}
          />
        ) : (
          <NonClusterMapMarkerContainer clinics={clinics} />
        )}

        <CustomMapControl position={MAP_CONTROL_POSITIONS.myLocationIcon}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            data-testid="img-my-location"
            src={Images.MY_LOCATION}
            alt="My Location"
            onClick={centerToMyLocation}
          />
        </CustomMapControl>
      </GoogleMap>
      <Toast
        open={openSnackbar}
        handleClose={closeSnackBar}
        message={formatMessage(
          intl,
          'lifestyle.clinic.snackbar.message',
          'Google Maps does not have permission to use your location. Enable location services on your browser.',
        )}
      />
    </Box>
  );
};

Map.contextTypes = {
  [MAP]: PropTypes.shape({}),
};

Map.defaultProps = {
  selectedClinic: {},
};

Map.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  view: PropTypes.string.isRequired,
  showClinicDetail: PropTypes.bool.isRequired,
  selectedClinic: PropTypes.shape({}),
  fitMapToOriginalPosition: PropTypes.bool.isRequired,
  selectedClinicFromSearchResultPanel: PropTypes.bool.isRequired,
  setFitMapToOriginalPosition: PropTypes.func.isRequired,
};

export default injectIntl(withScriptjs(withGoogleMap(Map)));
