import { connect } from 'react-redux';

import Recommendations from './Recommendations';
import { getRecommendations } from './action';
import { loaderDetail } from '../../loader';
import { errorDetails } from '../../error';
import LOADER from '../../../constants/loader';
import ERROR from '../../../constants/error';

export const mapStateToProps = (
  { loader, error, common: { recommendations } },
  { tipCategory },
) => ({
  ...loaderDetail(loader, LOADER.recommendations),
  ...errorDetails(error, ERROR.recommendations),
  recommendations: recommendations.details,
  tipCategory,
});

export const mapDispatchToProps = dispatch => ({
  getRecommendations: tipCategory => dispatch(getRecommendations(tipCategory)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recommendations);
