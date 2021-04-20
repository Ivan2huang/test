import { connect } from 'react-redux';
import ClinicMarker from './ClinicMarker';
import { handleSingleClinicSelect } from './action';

export const mapStateToProps = ({ clinic }, ownProps) => {
  const { selectedClinic } = clinic;
  return {
    selectedClinic,
    clinic: ownProps.clinic,
  };
};

export const mapDispatchToProps = dispatch => ({
  setSelectedClinic: clinic => {
    dispatch(handleSingleClinicSelect(clinic, false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicMarker);
