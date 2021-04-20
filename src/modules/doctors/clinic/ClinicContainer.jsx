import React from 'react';
import { connect } from 'react-redux';
import {
  getClinics,
  hideToastMessage,
  updateResultantClinics,
  updateSearchedClinics,
} from './action';
import Clinic from './Clinic';
import Doctors from '../DoctorsContainer';
import { FIND_DOCTOR_ID } from '../constant';

export const ClinicContainer = props => {
  return (
    <Doctors active={FIND_DOCTOR_ID} isLoaded fillRight>
      <Clinic {...props} />
    </Doctors>
  );
};

export const mapStateToProps = ({ clinic, benefits }) => {
  const { clinics, openSnackBar } = clinic;
  return {
    clinics,
    openSnackBar,
    isWalletsDisabled: benefits.wallets.isWalletsDisabled,
  };
};

export const mapDispatchToProps = dispatch => ({
  getClinics: () => dispatch(getClinics()),
  setResultantClinics: clinics => dispatch(updateResultantClinics(clinics)),
  setSearchedClinics: clinics => dispatch(updateSearchedClinics(clinics)),
  closeSnackBar: () => dispatch(hideToastMessage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicContainer);
