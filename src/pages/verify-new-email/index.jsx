import withLayout from '../../layouts/withLoginLayoutProvider';
import VerifyNewEmail from '../../modules/me/details/personal-email/verify-new-email/VerifyNewEmail';

export default withLayout(VerifyNewEmail, {
  showHeaderBrand: true,
  contentColumns: { xs: 12, sm: 12, md: 12 },
});
