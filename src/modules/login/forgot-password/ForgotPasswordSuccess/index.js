import DefaultForgotPassword from './ForgotPasswordSuccess';
import CendolForgotPassword from './ForgotPasswordSuccess.cendol';
import BasilForogtPassword from './ForgotPasswordSuccess.basil';
import CoreForgotPassword from './ForgotPasswordSuccess.core';
import CONFIG from '../../../../constants/config';

const containers = {
  cendol: CendolForgotPassword,
  balboa: DefaultForgotPassword,
  basil: BasilForogtPassword,
  core: CoreForgotPassword,
};

const container = containers[CONFIG.themeCode] || DefaultForgotPassword;

export default container;
