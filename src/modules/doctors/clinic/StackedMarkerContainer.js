import { connect } from 'react-redux';
import StackedMarker from './StackedMarker';
import { handleStackedClinicSelect } from './action';

export const mapStateToProps = ({ clinic }, ownProps) => {
  const { selectedStackedClinics } = clinic;
  return {
    selectedStackedClinics,
    ...ownProps,
  };
};

export const mapDispatchToProps = dispatch => ({
  setStackedClinics: selectedStackedClinics => {
    dispatch(handleStackedClinicSelect(selectedStackedClinics));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StackedMarker);
