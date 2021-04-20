import { connect } from 'react-redux';
import Lifestyle from './Lifestyle';
import { getLifestyleDetails } from './action';
import LOADER from '../../constants/loader';
import { loaderDetail } from '../loader';

export const mapStateToProps = ({ lifestyle, loader }) => ({
  lifestyleDetails: lifestyle.overview.details,
  ...loaderDetail(loader, LOADER.page),
});

export const mapDispatchToProps = dispatch => ({
  getLifestyleDetails: () => {
    dispatch(getLifestyleDetails());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lifestyle);
