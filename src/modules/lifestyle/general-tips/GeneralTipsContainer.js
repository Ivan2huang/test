import { connect } from 'react-redux';

import GeneralTips from './GeneralTips';
import { getLifestyleTips } from './action';
import { loaderDetail } from '../../loader';
import LOADER from '../../../constants/loader';
import { errorDetails } from '../../error';
import ERROR from '../../../constants/error';

export const mapStateToProps = ({ loader, error, lifestyle }) => ({
  ...loaderDetail(loader, LOADER.generalTips),
  ...errorDetails(error, ERROR.generalTips),
  tips: lifestyle.tips.details.general,
});

export const mapDispatchToProps = dispatch => ({
  getLifestyleTips: () => dispatch(getLifestyleTips()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneralTips);
