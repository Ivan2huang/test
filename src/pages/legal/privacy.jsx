import { Privacy } from '../../modules/legal/privacy';
import Images from '../../constants/images';
import withLegalLayout from '../../modules/legal/withLegalLayoutProvider';

export default withLegalLayout(Privacy, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
});
