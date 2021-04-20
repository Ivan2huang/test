import { connect } from 'react-redux';
import ClinicListView from './ClinicListView';
import {
  handleSingleClinicSelect,
  updateSelectedStackedClinics,
} from './action';

export const mapStateToProps = ({ clinic }) => {
  const {
    selectedStackedClinics,
    showClinicDetail,
    resultantClinics,
    view,
  } = clinic;
  return {
    showClinicDetail,
    selectedStackedClinics,
    resultantClinics,
    view,
  };
};

export const mapDispatchToProps = dispatch => ({
  handleOnViewClinicDetailsClick: (clinic, viewFor) => {
    dispatch(handleSingleClinicSelect(clinic, true, viewFor));
  },
  backToResults: () => {
    dispatch(updateSelectedStackedClinics([]));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicListView);
