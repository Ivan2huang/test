import Images from '../../constants/images';
import withLegalLayout from '../../modules/legal/withLegalLayoutProvider';
import { NewsLetter } from '../../modules/legal/newsletter';

export default withLegalLayout(NewsLetter, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
});
