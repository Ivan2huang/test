import { connect } from 'react-redux';
import { handleSingleClinicSelect } from './action';
import NonClusterMapMarker from './NonClusterMapMarker';

export const mapStateToProps = ({ clinic }, ownProps) => {
  const { selectedClinic } = clinic;
  return {
    selectedClinic,
    ...ownProps,
  };
};

export const mapDispatchToProps = dispatch => ({
  selectPin: clinic => {
    dispatch(handleSingleClinicSelect(clinic, false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NonClusterMapMarker);
