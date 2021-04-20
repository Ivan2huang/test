import DefaultResetPassword from './ResetPasswordSuccess';
import CendolResetPassword from './ResetPasswordSuccess.cendol';
import BasilResetPassword from './ResetPasswordSuccess.basil';
import GingerResetPassword from './ResetPasswordSuccess.ginger';
import CoreResetPassword from './ResetPasswordSuccess.core';
import CONFIG from '../../../../constants/config';

const containers = {
  cendol: CendolResetPassword,
  balboa: DefaultResetPassword,
  basil: BasilResetPassword,
  ginger: GingerResetPassword,
  core: CoreResetPassword,
};

const container = containers[CONFIG.themeCode] || DefaultResetPassword;

export default container;
