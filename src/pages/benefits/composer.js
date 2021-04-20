import { compose } from 'redux';
import withLayout from '../../layouts/withLayoutProvider';
import withAuth from '../../authentication/withAuthProvider';

export default (...args) =>
  compose(
    withAuth,
    withLayout,
  )(...args);
