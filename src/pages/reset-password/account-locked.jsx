import CONFIG from '../../constants/config';
import { AccountLocked } from '../../modules/login/reset-password';
import withLoginLayout from '../../layouts/withLoginLayoutProvider';
import Images from '../../constants/images';

const background = {};
const illustrations = {
  cendol: Images.ERROR_BACKGROUND,
  balboa: Images.ERROR_BACKGROUND,
  basil: Images.ERROR_BACKGROUND,
  ginger: Images.ERROR_BACKGROUND,
  core: Images.ERROR_BACKGROUND,
};
const displayFooter = {
  balboa: 'none',
};
const illustrationAlignment = {
  core: 'top',
};

export default withLoginLayout(AccountLocked, {
  backgroundImage: background[CONFIG.themeCode],
  illustration: illustrations[CONFIG.themeCode],
  illustrationAlignment: illustrationAlignment[CONFIG.themeCode],
  displayFooter,
});
