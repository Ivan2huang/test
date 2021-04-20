import { connect } from 'react-redux';

import { getLifestyleResults } from './action';
import LifestyleResults from './LifestyleResults';
import { loaderDetail } from '../../loader';
import LOADER from '../../../constants/loader';
import { errorDetails } from '../../error';
import ERROR from '../../../constants/error';

export const mapStateToProps = ({ loader, error, lifestyle }) => ({
  ...loaderDetail(loader, LOADER.lifestyleResults),
  ...errorDetails(error, ERROR.lifestyleResults),
  lifestyleTipsErrorState: errorDetails(error, ERROR.generalTips).errorState,
  lifestyleResults: lifestyle.results,
  lifestyleTips: lifestyle.tips.details,
});

export const mapDispatchToProps = dispatch => ({
  getLifestyleResults: () => dispatch(getLifestyleResults()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LifestyleResults);
