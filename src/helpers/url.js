/* eslint-disable import/no-cycle */
import { objectToURLParams } from './helpers';
import { SERVICE_IDENTIFIERS, FUNC_IDENTIFIERS } from '../constants/api';
import { getCookie } from './auth';
import { USER_ID, CLIENT_ID } from '../constants/auth';
import CONFIG from '../constants/config';

const CLAIM_API_URL = () =>
  `${SERVICE_IDENTIFIERS.claimService}/${getCookie(CLIENT_ID)}`;

const PANEL_API_URL = () =>
  `${FUNC_IDENTIFIERS.funcPanels}/clients/${getCookie(
    CLIENT_ID,
  )}/users/${getCookie(USER_ID)}`;

const BENEFIT_API_URL = () =>
  `${SERVICE_IDENTIFIERS.benefitService}/${getCookie(
    CLIENT_ID,
  )}/users/${getCookie(USER_ID)}`;

const MEMBER_API_URL = () =>
  `${SERVICE_IDENTIFIERS.memberService}/${getCookie(
    CLIENT_ID,
  )}/users/${getCookie(USER_ID)}`;

const WALLET_API_URL = () =>
  `${SERVICE_IDENTIFIERS.walletService}/${getCookie(
    CLIENT_ID,
  )}/users/${getCookie(USER_ID)}`;

const E_WALLET_API_URL = () =>
  `${SERVICE_IDENTIFIERS.eWalletService}/${getCookie(
    CLIENT_ID,
  )}/members/${getCookie(USER_ID)}`;

const EMPLOYEE_API_URL = () =>
  `${SERVICE_IDENTIFIERS.memberService}/${getCookie(CLIENT_ID)}/employees/`;

const LIFESTYLE_API_URL = () =>
  `${SERVICE_IDENTIFIERS.wellnessService}/${getCookie(
    CLIENT_ID,
  )}/users/${getCookie(USER_ID)}`;

const RECOMMENDATION_API_URL = () =>
  `${SERVICE_IDENTIFIERS.recommendationService}/${getCookie(
    CLIENT_ID,
  )}/users/${getCookie(USER_ID)}`;

const PAYMENT_API_URL = (clientId, userId) => {
  const client = clientId || getCookie(CLIENT_ID);
  const user = userId || getCookie(USER_ID);
  return `${SERVICE_IDENTIFIERS.paymentService}/${client}/users/${user}`;
};

const fallbackClientId = () => {
  return getCookie(CLIENT_ID) || CONFIG.clientId;
};

const URL = {
  get login() {
    return `${SERVICE_IDENTIFIERS.authService}/OAuth/token`;
  },

  get identities() {
    return `${SERVICE_IDENTIFIERS.zuulService}/me`;
  },

  get forgotPassword() {
    return `${
      SERVICE_IDENTIFIERS.memberService
    }/${fallbackClientId()}/users/forgot-password`;
  },

  requestResetPassword(userId) {
    return `${
      SERVICE_IDENTIFIERS.memberService
    }/${fallbackClientId()}/users/${userId}/request-reset-password`;
  },

  resetPassword(clientId) {
    return `${SERVICE_IDENTIFIERS.memberService}/${clientId}/users/reset-password`;
  },

  validateResetPasswordRequest(clientId) {
    return `${SERVICE_IDENTIFIERS.authServiceV2}/${clientId}/users/validate-reset-password-request`;
  },

  validateActivationRequest(clientId) {
    if (clientId) {
      return `${SERVICE_IDENTIFIERS.memberService}/${clientId}/users/verify`;
    }
    return `${SERVICE_IDENTIFIERS.memberService}/${getCookie(
      CLIENT_ID,
    )}/users/verify`;
  },

  get memberProfile() {
    return `${MEMBER_API_URL()}/profile`;
  },

  employeeProfile: employeeMemberId => {
    return `${EMPLOYEE_API_URL()}${employeeMemberId}/details`;
  },

  inviteDependent: dependentId =>
    `${EMPLOYEE_API_URL()}${getCookie(
      USER_ID,
    )}/dependents/${dependentId}/invitation`,

  get memberBenefits() {
    return `${
      CONFIG.useExternalBenefits
        ? FUNC_IDENTIFIERS.funcExternalBenefits
        : FUNC_IDENTIFIERS.funcBenefits
    }/clients/${getCookie(CLIENT_ID)}/users/${getCookie(USER_ID)}/benefits`;
  },

  get healthCards() {
    return `${BENEFIT_API_URL()}/healthcards`;
  },

  get policyDetails() {
    return `${BENEFIT_API_URL()}/policyDetails`;
  },

  get clinics() {
    return `${PANEL_API_URL()}/panels`;
  },

  claimDetails: id =>
    `${CLAIM_API_URL()}/users/${getCookie(USER_ID)}/claims/${id}`,

  claimDocument: id =>
    `${CLAIM_API_URL()}/users/${getCookie(USER_ID)}/claim/documents/${id}`,

  get claimTypes() {
    return `${CLAIM_API_URL()}/claimtypes`;
  },

  get claims() {
    return `${CLAIM_API_URL()}/users/${getCookie(USER_ID)}/claims`;
  },

  filterClaims: params => {
    const query = objectToURLParams(params);
    return `${CLAIM_API_URL()}/users/${getCookie(USER_ID)}/claims?${query}`;
  },

  get submitClaim() {
    return `${CLAIM_API_URL()}/users/${getCookie(USER_ID)}/claims`;
  },

  uploadDocument: type =>
    `${CLAIM_API_URL()}/users/${getCookie(USER_ID)}/claim/documents/${type}`,

  get walletBalance() {
    return `${WALLET_API_URL()}/wallet/externalwallet`;
  },
  get updateSettings() {
    return `${MEMBER_API_URL()}/profile`;
  },

  get getUsefulDocuments() {
    return `${FUNC_IDENTIFIERS.funcContentDocuments}/clients/${getCookie(
      CLIENT_ID,
    )}/documents`;
  },

  companyContactDetailsAndFAQs(locale = CONFIG.defaultLanguage) {
    return `${FUNC_IDENTIFIERS.funcContentHelp}/clients/${getCookie(
      CLIENT_ID,
    )}/help?locale=${locale}`;
  },

  getUsefulDocument: documentId =>
    `${FUNC_IDENTIFIERS.funcContentDownloadDocument}/clients/${getCookie(
      CLIENT_ID,
    )}/documents/${documentId}`,

  get getLifestyleDetails() {
    return `${LIFESTYLE_API_URL()}/lifestyleresponse`;
  },

  get lifestyleTips() {
    return `${LIFESTYLE_API_URL()}/lifestyletips`;
  },

  get submitLifestyleQuestionnaire() {
    return `${LIFESTYLE_API_URL()}/lifestyleresponse`;
  },

  get lifestyleResults() {
    return `${LIFESTYLE_API_URL()}/LifestyleResults`;
  },

  get lifestyleHealthScoresHistory() {
    return `${LIFESTYLE_API_URL()}/HealthScoreHistory`;
  },

  get lifestyleHealthScore() {
    return `${LIFESTYLE_API_URL()}/HealthScore`;
  },

  get faceAgingCategories() {
    return `${LIFESTYLE_API_URL()}/FaceAging/results`;
  },

  faceAgingImage: (age, category) =>
    `${LIFESTYLE_API_URL()}/FaceAging/results/image?age=${age}&category=${category}&random=${performance.now()}`,

  get lifestyleFaceImage() {
    return `${LIFESTYLE_API_URL()}/faceaging/image?random=${performance.now()}`;
  },

  contactUsInfo: locale => {
    return `${
      FUNC_IDENTIFIERS.funcContentContacts
    }/clients/${fallbackClientId()}/contact?locale=${locale}`;
  },

  recommendations: riskId => {
    return riskId
      ? `${RECOMMENDATION_API_URL()}/recommendations?risk=${riskId}`
      : `${RECOMMENDATION_API_URL()}/recommendations`;
  },

  privacyPolicy: locale => {
    const baseURL = `${
      FUNC_IDENTIFIERS.funcContentPrivacyPolicy
    }/clients/${fallbackClientId()}/legal/privacy-policy`;
    if (locale) {
      return `${baseURL}?locale=${locale}`;
    }

    return baseURL;
  },

  termsConditions: locale => {
    const baseURL = `${
      FUNC_IDENTIFIERS.funcContentTermsConditions
    }/clients/${fallbackClientId()}/legal/terms-conditions`;
    if (locale) {
      return `${baseURL}?locale=${locale}`;
    }
    return baseURL;
  },

  paymentListInstruments(clientId, userId) {
    return `${PAYMENT_API_URL(clientId, userId)}/instruments`;
  },

  validateInstrument(clientId, userId, merchantOrderId) {
    return `${PAYMENT_API_URL(clientId, userId)}/preauth/${merchantOrderId}`;
  },

  paymentSubmitInstruments(clientId, userId) {
    return `${PAYMENT_API_URL(clientId, userId)}/preauth`;
  },

  createOrder(clientId, userId) {
    return `${PAYMENT_API_URL(clientId, userId)}/payments`;
  },

  validateOrder(clientId, userId, merchantOrderId) {
    return `${PAYMENT_API_URL(clientId, userId)}/payments/${merchantOrderId}`;
  },

  getPaymentMethods(clientId, userId, params) {
    const query = objectToURLParams(params);
    return `${PAYMENT_API_URL(clientId, userId)}/payoptionconsult?${query}`;
  },

  get getMPGSSessionUrl() {
    return 'api/v1/mpgssessionurl';
  },

  getPaymentPurchaseMethods(purchaseId) {
    return `${PAYMENT_API_URL()}/purchase/${purchaseId}/payoptionconsult`;
  },

  makePayment(purchaseId) {
    return `${PAYMENT_API_URL()}/purchase/${purchaseId}/payments`;
  },

  newsLetter: locale => {
    const baseURL = `${
      FUNC_IDENTIFIERS.funcContentWellness
    }/clients/${fallbackClientId()}/legal/wellness-newsletter-agreement`;
    if (locale) {
      return `${baseURL}?locale=${locale}`;
    }

    return baseURL;
  },

  updateCookieLanguage(code) {
    return `/api/languages/${code}`;
  },

  eWallets: includeDependents => {
    return `${E_WALLET_API_URL()}/balance?includeDependents=${includeDependents}`;
  },

  get currentPlanyear() {
    return `${SERVICE_IDENTIFIERS.benefitService}/${getCookie(
      CLIENT_ID,
    )}/planyears/current`;
  },

  get changePersonalEmail() {
    return `${MEMBER_API_URL()}/personal-email/request-change`;
  },

  verifyPersonalEmailToken: clientId => {
    return `${SERVICE_IDENTIFIERS.memberService}/${clientId}/users/personal-email/verify`;
  },

  get requestPersonalEmailStatus() {
    return `${MEMBER_API_URL()}/personal-email/pending-requests`;
  },

  get changeMeInfos() {
    return `${MEMBER_API_URL()}/loginids/request-change`;
  },

  get verifyOTP() {
    return `${MEMBER_API_URL()}/phone-number/verify`;
  },

  get pendingActionRequestChange() {
    return `${MEMBER_API_URL()}/pending-actions/request-change`;
  },

  get pendingActionsRequest() {
    return `${MEMBER_API_URL()}/pending-actions/request`;
  },

  get OTPVerification() {
    return `${MEMBER_API_URL()}/pending-actions/verify`;
  },

  get refreshToken() {
    return `${SERVICE_IDENTIFIERS.zuulService}/auth/token`;
  },

  getContentNote: (locale, types = []) => {
    const typeParams = types.map(t => `type=${t}`).join('&');
    return `${
      FUNC_IDENTIFIERS.funcContentNote
    }/clients/${fallbackClientId()}/notes?locale=${locale}&${typeParams}`;
  },

  getProductName: () => {
    return `${FUNC_IDENTIFIERS.funcContentProduct}/product`;
  },

  lifestyleTipFromCMS: type => {
    return `${
      FUNC_IDENTIFIERS.funcContentTip
    }/clients/${fallbackClientId()}/tips?type=${type}`;
  },
};

export default URL;
