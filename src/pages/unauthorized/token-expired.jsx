import TokenExpired from '../../modules/unauthorized/TokenExpired';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

export default withLoginLayout(TokenExpired, {
  backgroundImage: Images.ON_BOARDING_SUCCESS_BACKGROUND,
  showHeaderBrand: true,
  displayFooterMobile: true,
  illustrationAlignment: 'flex-start',
  contentColumns: { xs: 12, md: 6 },
  contentOffset: { sm: 2, md: 6 },
  isDarkLogo: true,
});
