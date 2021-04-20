import { ForgotPasswordSuccessContainer } from '../../modules/login/forgot-password';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

export default withLoginLayout(ForgotPasswordSuccessContainer, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
});
