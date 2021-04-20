import CONFIG from '../../constants/config';
import { ResetPasswordSuccess } from '../../modules/login/reset-password';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

const illustrations = {
  cendol: Images.RESET_PASSWORD_SUCCESS,
};
const illustrationsMobile = {
  basil: Images.RESET_PASSWORD_SUCCESS,
};
export default withLoginLayout(ResetPasswordSuccess, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
  illustration: illustrations[CONFIG.themeCode],
  illustrationMobile: illustrationsMobile[CONFIG.themeCode],
});
