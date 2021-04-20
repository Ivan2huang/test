import { connect } from 'react-redux';

import LifestyleHistory from './LifestyleHistory';
import { getLifestyleHealthScoresHistory } from './action';
import { loaderDetail } from '../../loader';
import LOADER from '../../../constants/loader';
import { errorDetails } from '../../error';
import ERROR from '../../../constants/error';

export const mapStateToProps = ({ loader, error, lifestyle }) => ({
  ...loaderDetail(loader, LOADER.lifestyleHistory),
  ...errorDetails(error, ERROR.lifestyleHistory),
  healthScoresHistory: lifestyle.history.healthScoresHistory,
});

export const mapDispatchToProps = dispatch => ({
  getLifestyleHealthScoresHistory: () =>
    dispatch(getLifestyleHealthScoresHistory()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LifestyleHistory);
