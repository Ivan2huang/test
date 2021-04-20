import { connect } from 'react-redux';
import ClinicDetailView from './ClinicDetailView';
import { hideClinicDetail, updateSelectedClinic } from './action';

export const mapStateToProps = ({ clinic }) => {
  const { showClinicDetail, selectedClinic } = clinic;
  return {
    showClinicDetail,
    clinic: selectedClinic,
  };
};

export const mapDispatchToProps = dispatch => ({
  backToResults: () => {
    dispatch(hideClinicDetail());
    dispatch(updateSelectedClinic({}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicDetailView);
