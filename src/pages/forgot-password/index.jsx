import { ForgotPasswordContainer } from '../../modules/login/forgot-password';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

export default withLoginLayout(ForgotPasswordContainer, {
  backgroundImage: Images.FORGOT_PASSWORD_BACKGROUND,
});
