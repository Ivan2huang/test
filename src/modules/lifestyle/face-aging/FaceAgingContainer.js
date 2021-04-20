import { connect } from 'react-redux';

import FaceAging from './FaceAging';
import { getUserFaceAgingCategories } from './action';
import { loaderDetail } from '../../loader';
import LOADER from '../../../constants/loader';
import { errorDetails } from '../../error';
import ERROR from '../../../constants/error';

export const mapStateToProps = ({ loader, error, lifestyle }) => ({
  ...loaderDetail(loader, LOADER.faceAgingCategories),
  ...errorDetails(error, ERROR.faceAgingCategories),
  userFaceAgingData: lifestyle.faceAging,
});

export const mapDispatchToProps = dispatch => ({
  getUserFaceAgingCategories: () => dispatch(getUserFaceAgingCategories()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FaceAging);
