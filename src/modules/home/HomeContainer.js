import { connect } from 'react-redux';
import { getMemberProfile } from '../me';
import Home from './Home';

export const mapDispatchToProps = dispatch => ({
  getMemberProfile: () => {
    dispatch(getMemberProfile());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
