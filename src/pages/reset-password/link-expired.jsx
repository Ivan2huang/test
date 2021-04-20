import CONFIG from '../../constants/config';
import { ResetPasswordLinkExpired } from '../../modules/login/reset-password';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

const background = {
  balboa: Images.FORGOT_PASSWORD_BACKGROUND,
};
const illustrations = {
  cendol: Images.ERROR_BACKGROUND,
  basil: Images.ERROR_BACKGROUND,
  ginger: Images.ERROR_BACKGROUND,
  core: Images.RESET_PASSWORD_LINK_EXPIRED_BACKGROUND,
};

export default withLoginLayout(ResetPasswordLinkExpired, {
  backgroundImage: background[CONFIG.themeCode],
  illustration: illustrations[CONFIG.themeCode],
  illustrationAlignment: 'top',
});
