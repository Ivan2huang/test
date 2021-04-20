import { connect } from 'react-redux';

import Recommendations from './Recommendations';
import { getSuggestionRecommendations } from './action';
import { loaderDetail } from '../../loader';
import { errorDetails } from '../../error';
import LOADER from '../../../constants/loader';
import ERROR from '../../../constants/error';

export const mapStateToProps = ({
  loader,
  error,
  common: { recommendations },
}) => ({
  ...loaderDetail(loader, LOADER.suggestionRecommendations),
  ...errorDetails(error, ERROR.suggestionRecommendations),
  recommendations: recommendations.suggestions,
});

export const mapDispatchToProps = dispatch => ({
  getRecommendations: () => dispatch(getSuggestionRecommendations()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recommendations);
