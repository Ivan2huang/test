import { compose } from 'redux';
import withAuth from '../authentication/withAuthProvider';
import { Home } from '../modules/home';

console.log('src/pages/index.jsx ');
export default compose(withAuth)(Home);
