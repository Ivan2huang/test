import { connect } from 'react-redux';

import LifestyleScore from './LifestyleScore';
import { getLifestyleScore } from './action';
import { loaderDetail } from '../../loader';
import LOADER from '../../../constants/loader';
import { errorDetails } from '../../error';
import ERROR from '../../../constants/error';

export const mapStateToProps = ({ loader, error, lifestyle }) => ({
  ...loaderDetail(loader, LOADER.lifestyleScore),
  ...errorDetails(error, ERROR.lifestyleScore),
  healthScore: lifestyle.healthScore.healthScore,
});

export const mapDispatchToProps = dispatch => ({
  getLifestyleHealthScore: () => dispatch(getLifestyleScore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LifestyleScore);
