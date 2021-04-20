import { connect } from 'react-redux';
import Map from './Map';
import { updateFitMapToOriginalPosition } from './action';

export const mapStateToProps = ({ clinic }, ownProps) => {
  const {
    resultantClinics,
    showClinicDetail,
    view,
    fitMapToOriginalPosition,
    selectedClinic,
    selectedClinicFromSearchResultPanel,
  } = clinic;
  return {
    clinics: resultantClinics,
    selectedClinic,
    showClinicDetail,
    view,
    fitMapToOriginalPosition,
    selectedClinicFromSearchResultPanel,
    ...ownProps,
  };
};

export const mapDispatchToProps = dispatch => ({
  setFitMapToOriginalPosition: fitMapToScreen =>
    dispatch(updateFitMapToOriginalPosition(fitMapToScreen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
