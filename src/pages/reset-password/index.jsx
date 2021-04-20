import CONFIG from '../../constants/config';
import { ResetPasswordContainer } from '../../modules/login/reset-password';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

const illustrations = {
  cendol: Images.RESET_PASSWORD,
};

const showHeaderBrand = {
  basil: true,
};

export default withLoginLayout(ResetPasswordContainer, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
  illustration: illustrations[CONFIG.themeCode],
  illustrationDesktopOnly: true,
  showHeaderBrand: showHeaderBrand[CONFIG.themeCode],
});
