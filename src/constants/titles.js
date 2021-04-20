import paths from '../helpers/paths';
import * as ME from '../modules/me/constant';
import * as BENEFITS from '../modules/benefits/constant';
import * as DOCTORS from '../modules/doctors/constant';

const titles = {
  [paths.common.root]: {
    id: 'titles.lifestyle.index',
    defaultMessage: 'My lifestyle overview',
  },
  [paths.common.default]: {
    id: 'titles.lifestyle.index',
    defaultMessage: 'My lifestyle overview',
  },
  [paths.common.lifestyle]: {
    id: 'titles.lifestyle.index',
    defaultMessage: 'My lifestyle overview',
  },
  [paths.common.questionnaire]: {
    id: 'titles.lifestyle.questionnaire',
    defaultMessage: 'Lifestyle Questionnaire',
  },
  [paths.common.clinic]: {
    id: 'titles.lifestyle.clinic',
    defaultMessage: 'Search Clinic or location',
  },
  [paths.common.claims]: {
    id: 'titles.claims.index',
    defaultMessage: 'Claims',
  },
  [paths.common.claimDetails]: {
    id: 'titles.claims.claimDetails',
    defaultMessage: 'Claims details',
  },
  [paths.employee.makeClaim]: {
    id: 'titles.claims.makeClaim',
    defaultMessage: 'Make a claim',
  },
  [paths.common.claimSuccess]: {
    id: 'titles.claims.success',
    defaultMessage: 'Success(Claim Submission)',
  },
  [paths.common.choices]: {
    id: 'titles.choices.index',
    defaultMessage: 'Choices',
  },
  [ME.ME_PATHNAME]: {
    id: 'titles.me.index',
    defaultMessage: 'Me: My benefits',
  },
  [ME.DETAILS_PATHNAME]: {
    id: 'titles.me.details',
    defaultMessage: 'Me: My details',
  },
  [ME.INVIDE_DEP_PATHNAME]: {
    id: 'titles.me.details.dependent.invite',
    defaultMessage: 'Invite dependents',
  },
  [ME.INVIDE_DEP_SUCCESS_PATHNAME]: {
    id: 'titles.me.details.dependent.success',
    defaultMessage: 'Invite sent',
  },
  [ME.SETTINGS_PATHNAME]: {
    id: 'titles.me.setting',
    defaultMessage: 'Settings',
  },

  [BENEFITS.BENEFITS_ROOT_PATHNAME]: {
    id: 'titles.benefits.index',
    defaultMessage: 'Me: eHealth card',
  },
  [BENEFITS.HEALTHCARDS_PATHNAME]: {
    id: 'titles.benefits.index',
    defaultMessage: 'Me: eHealth card',
  },
  [BENEFITS.BENEFITS_PATHNAME]: {
    id: 'titles.benefits.benefits',
    defaultMessage: 'My benefits',
  },
  [BENEFITS.DOCUMENTS_PATHNAME]: {
    id: 'titles.benefits.usefulDocument',
    defaultMessage: 'Forms and Documents',
  },
  [BENEFITS.E_WALLET_PATHNAME]: {
    id: 'titles.benefits.wallets',
    defaultMessage: 'Wallets',
  },
  [BENEFITS.FAQ_PATHNAME]: {
    id: 'titles.benefits.help',
    defaultMessage: 'Help FAQ',
  },

  [DOCTORS.DOCTORS_ROOT_PATHNAME]: {
    id: 'titles.doctors.index',
    defaultMessage: 'Find a doctor',
  },
  [DOCTORS.FIND_DOCTOR_PATHNAME]: {
    id: 'titles.doctors.index',
    defaultMessage: 'Find a doctor',
  },
  [DOCTORS.HEALTHCARDS_PATHNAME]: {
    id: 'titles.doctors.healthCards',
    defaultMessage: 'eHealth card',
  },

  [paths.common.forgotPassword]: {
    id: 'titles.forgotPassword.index',
    defaultMessage: 'Forgot password',
  },
  [paths.common.forgotPasswordSuccess]: {
    id: 'titles.forgotPassword.success',
    defaultMessage: 'Password changed successfully',
  },
  [paths.common.privacy]: {
    id: 'titles.legal.privacy',
    defaultMessage: 'Privacy policy',
  },
  [paths.common.terms]: {
    id: 'titles.legal.terms',
    defaultMessage: 'Terms and conditions',
  },
  [paths.common.onBoarding]: {
    id: 'titles.onBoarding.index',
    defaultMessage: 'Welcome! Set your password',
  },
  [paths.common.onBoardingSuccess]: {
    id: 'titles.onBoarding.success',
    defaultMessage: 'You are all set!',
  },
  [paths.common.onBoardingLinkExpired]: {
    id: 'titles.onBoarding.linkExpired',
    defaultMessage: 'Password link expired',
  },
  [paths.common.resetPassword]: {
    id: 'titles.resetPassword.index',
    defaultMessage: 'Reset password',
  },
  [paths.common.resetPasswordSuccess]: {
    id: 'titles.resetPassword.success',
    defaultMessage: 'Reset password success',
  },
  [paths.common.resetPasswordLinkExpired]: {
    id: 'titles.resetPassword.linkExpired',
    defaultMessage: 'Password link expired',
  },
  [paths.common.unauthorized]: {
    id: 'titles.unauthorized.index',
    defaultMessage: 'Unauthorized!',
  },
  [paths.common.error]: {
    id: 'titles.error',
    defaultMessage: 'Oops! Something went Wrong',
  },
  [paths.payment.preauth]: {
    id: 'titles.preauth.index',
    defaultMessage: 'Preauth',
  },
  [paths.payment.preauthResult]: {
    id: 'titles.preauthResult.index',
    defaultMessage: 'Preauth result',
  },
  [paths.payment.paymentShop]: {
    id: 'titles.paymentShop.index',
    defaultMessage: 'Payment shop',
  },
  [paths.payment.paymentShopResult]: {
    id: 'titles.paymentShopResult.index',
    defaultMessage: 'Payment shop result',
  },
};

export default titles;
