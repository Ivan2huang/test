import { Terms } from '../../modules/legal/terms';
import Images from '../../constants/images';
import withLegalLayout from '../../modules/legal/withLegalLayoutProvider';

export default withLegalLayout(Terms, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
});
