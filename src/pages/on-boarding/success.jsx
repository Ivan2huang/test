import { OnBoardingSuccess } from '../../modules/login/on-boarding';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

export default withLoginLayout(OnBoardingSuccess, {
  backgroundImage: Images.ON_BOARDING_SUCCESS_BACKGROUND,
  showHeaderBrand: true,
  displayFooterMobile: true,
});
