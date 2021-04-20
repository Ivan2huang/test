import { UnableSendOTP } from '../../modules/login/account-activation';
import withInformLayout from '../../layouts/withInformLayout';

export default withInformLayout(UnableSendOTP, {
  showHeaderBrand: false,
});
