import withLayout from '../../layouts/withInformLayout';
import LinkExpired from '../../modules/me/details/personal-email/verify-new-email/LinkExpired';

export default withLayout(LinkExpired, {
  showHeaderBrand: true,
  contentColumns: { xs: 12, sm: 12, md: 12 },
});
