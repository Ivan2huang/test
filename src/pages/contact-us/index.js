import { ContactUs } from '../../modules/misc';
import withLegalLayout from '../../modules/legal/withLegalLayoutProvider';
import Images from '../../constants/images';

export default withLegalLayout(ContactUs, {
  backgroundImage: Images.CONTACT_US_BACKGROUND,
});
