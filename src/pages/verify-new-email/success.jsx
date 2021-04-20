import withLayout from '../../layouts/withInformLayout';
import VerifySuccess from '../../modules/me/details/personal-email/verify-new-email/Success';

export default withLayout(VerifySuccess, {
  showHeaderBrand: true,
  contentColumns: { xs: 12, sm: 12, md: 12 },
});
