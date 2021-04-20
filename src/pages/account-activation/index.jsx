import withInformLayout from '../../layouts/withInformLayout';
import { AccountActivation } from '../../modules/login/account-activation';

export default withInformLayout(AccountActivation, {
  showHeaderBrand: false,
});
