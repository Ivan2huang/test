import { connect } from 'react-redux';

import Loader from './Loader';
import { loaderDetail } from './util';
import LOADER from '../../constants/loader';

export const mapStateToProps = ({ loader }) => ({
  ...loaderDetail(loader, LOADER.page),
});

export default connect(mapStateToProps)(Loader);
