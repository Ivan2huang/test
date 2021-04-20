/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, withStyles } from '@material-ui/core';

import Toast from '../../../uiComponents/Toast';
import { MAP_CONFIG } from './mapConfig';
import { formatMessage } from '../../../helpers/helpers';
import LeftPanelContainer from './LeftPanelContainer';
import MapContainer from './MapContainer';

const style = theme => ({
  root: ({ isWalletsDisabled }) => {
    const walletHeight = isWalletsDisabled ? 0 : 54;
    const unit = walletHeight / theme.unitSpacing;

    return {
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100vh - ${theme.spacingX(53 + unit)})`,
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        height: `calc(100vh - ${theme.spacingX(54 + unit)})`,
      },
    };
  },
  mapContainer: {
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      marginLeft: `-${theme.spacingX(8)}`,
      marginRight: `-${theme.spacingX(8)}`,
    },
  },
});

const Clinic = ({
  intl,
  classes,
  clinics,
  openSnackBar,
  getClinics,
  setResultantClinics,
  setSearchedClinics,
  closeSnackBar,
}) => {
  useEffect(() => {
    getClinics();
  }, [intl]);

  useEffect(() => {
    const filterClinics = clinics.filter(c => c.latitude && c.longitude);
    setResultantClinics(filterClinics);
    setSearchedClinics(filterClinics);
  }, [clinics]);

  return (
    <Box className={classes.root}>
      <LeftPanelContainer />
      <Box classes={{ root: classes.mapContainer }}>
        <MapContainer {...MAP_CONFIG} />
      </Box>

      <Toast
        open={openSnackBar}
        handleClose={closeSnackBar}
        message={formatMessage(
          intl,
          'clinic.searchClinics.toast.noClinics',
          'No clinics available.',
        )}
      />
    </Box>
  );
};

Clinic.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    root: PropTypes.string.isRequired,
    mapContainer: PropTypes.string.isRequired,
  }).isRequired,
  clinics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
  openSnackBar: PropTypes.bool.isRequired,
  getClinics: PropTypes.func.isRequired,
  setResultantClinics: PropTypes.func.isRequired,
  setSearchedClinics: PropTypes.func.isRequired,
  closeSnackBar: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(style)(Clinic));
