import URL from '../url';
import { getCookie } from '../auth';
import CONFIG from '../../constants/config';

jest.mock('../auth', () => ({
  getCookie: jest.fn(),
}));

describe('URLs', () => {
  const clientId = 'testClientId';
  const userId = '1';

  afterEach(() => {
    getCookie.mockReset();
  });

  it('should get correct clinics url', () => {
    const backendApiUrl = '/func-panel-handle-panels';
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const actual = URL.clinics;
    const expected = `${backendApiUrl}/api/v1/clients/${clientId}/users/${userId}/panels`;

    expect(actual).toEqual(expected);
  });

  it('should get login url', () => {
    const expected = '/auth-service/api/v1/OAuth/token';
    const actual = URL.login;

    expect(actual).toEqual(expected);
  });

  it('should get identities url', () => {
    const expected = '/zuul-service/me';
    const actual = URL.identities;

    expect(actual).toEqual(expected);
  });

  it('should get forgot password url', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected =
      '/member-service/api/v1/clients/testClientId/users/forgot-password';
    const actual = URL.forgotPassword;

    expect(actual).toEqual(expected);
  });

  it('should request reset password url', () => {
    getCookie.mockReturnValueOnce(clientId);

    const expected =
      '/member-service/api/v1/clients/testClientId/users/client1/request-reset-password';
    const actual = URL.requestResetPassword('client1');

    expect(actual).toEqual(expected);
  });

  it('should get reset password url', () => {
    getCookie.mockReturnValueOnce(clientId);

    const expected =
      '/member-service/api/v1/clients/testClientId/users/reset-password';
    const actual = URL.resetPassword('testClientId');

    expect(actual).toEqual(expected);
  });

  it('should get validate reset password request url', () => {
    const expected =
      '/auth-service/api/v2/clients/testClientId/users/validate-reset-password-request';

    const actual = URL.validateResetPasswordRequest('testClientId');

    expect(actual).toEqual(expected);
  });

  it('should return validate activation url', () => {
    const expected = '/member-service/api/v1/clients/1/users/verify';
    const actual = URL.validateActivationRequest(1);

    expect(actual).toEqual(expected);
  });

  it('should return validate activation url without param', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = '/member-service/api/v1/clients/testClientId/users/verify';
    getCookie.mockReturnValueOnce(clientId);
    const actual = URL.validateActivationRequest();

    expect(actual).toEqual(expected);
  });

  it('should get claim types url', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/claim-service/api/v1/clients/${clientId}/claimtypes`;

    const actual = URL.claimTypes;

    expect(actual).toEqual(expected);
  });

  it('should get health cards details url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const benefitServiceUrl = '/benefit-service';
    const expected = `${benefitServiceUrl}/api/v1/clients/${clientId}/users/${userId}/healthcards`;

    const actual = URL.healthCards;

    expect(actual).toEqual(expected);
  });

  it('should get policy details url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const benefitServiceUrl = '/benefit-service';
    const expected = `${benefitServiceUrl}/api/v1/clients/${clientId}/users/${userId}/policyDetails`;

    const actual = URL.policyDetails;

    expect(actual).toEqual(expected);
  });

  it('should get member profile url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/profile`;

    const actual = URL.memberProfile;

    expect(actual).toEqual(expected);
  });

  it('should get user benefit service url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const expected = `/func-benefit-handle-benefits/api/v1/clients/${clientId}/users/${userId}/benefits`;

    const actual = URL.memberBenefits;

    expect(actual).toEqual(expected);
  });

  it('should get user external benefit service url', () => {
    CONFIG.useExternalBenefits = true;
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const expected = `/func-benefit-handle-external-benefits/api/v1/clients/${clientId}/users/${userId}/benefits`;

    const actual = URL.memberBenefits;

    expect(actual).toEqual(expected);
  });

  it('should get user wallet balance service url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const expected = `/wallet-service/api/v1/clients/${clientId}/users/${userId}/wallet/externalwallet`;

    const actual = URL.walletBalance;

    expect(actual).toEqual(expected);
  });

  it('should get claims service url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const expected = `/claim-service/api/v1/clients/${clientId}/users/${userId}/claims`;

    const actual = URL.claims;

    expect(actual).toEqual(expected);
  });

  it('should get claims service with paramters', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const params = {
      statuses: 'A',
    };

    const expected = `/claim-service/api/v1/clients/${clientId}/users/${userId}/claims?statuses=A`;

    const actual = URL.filterClaims(params);

    expect(actual).toEqual(expected);
  });

  it('should get claim upload document service url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const type = 'RECEIPT';

    const expected = `/claim-service/api/v1/clients/${clientId}/users/${userId}/claim/documents/RECEIPT`;

    const actual = URL.uploadDocument(type);

    expect(actual).toEqual(expected);
  });

  it('should get submit claim service url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/claim-service/api/v1/clients/${clientId}/users/${userId}/claims`;

    const actual = URL.submitClaim;

    expect(actual).toEqual(expected);
  });

  it('should get new claim details url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const claimId = '123';

    const expected = `/claim-service/api/v1/clients/${clientId}/users/${userId}/claims/${claimId}`;

    const actual = URL.claimDetails(claimId);

    expect(actual).toEqual(expected);
  });

  it('should return claim documents url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const documentId = '123';

    const expected = `/claim-service/api/v1/clients/${clientId}/users/${userId}/claim/documents/${documentId}`;

    const actual = URL.claimDocument(documentId);

    expect(actual).toEqual(expected);
  });

  it('should return update language preference url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/profile`;

    const actual = URL.updateSettings;

    expect(actual).toEqual(expected);
  });

  it('should return useful documents url', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-documents/api/v1/clients/${clientId}/documents`;

    const actual = URL.getUsefulDocuments;

    expect(actual).toEqual(expected);
  });

  it('should return useful document url', () => {
    getCookie.mockReturnValueOnce(clientId);
    const documentId = '123';
    const expected = `/func-content-documents-download/api/v1/clients/${clientId}/documents/${documentId}`;
    const actual = URL.getUsefulDocument(documentId);

    expect(actual).toEqual(expected);
  });

  it('should return company contact details and FAQs url', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-help/api/v1/clients/${clientId}/help?locale=en`;

    const actual = URL.companyContactDetailsAndFAQs();

    expect(actual).toEqual(expected);
  });

  it('should return employee profile details url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/employees/${userId}/details`;

    const actual = URL.employeeProfile(1);

    expect(actual).toEqual(expected);
  });

  it('should return lifestyle tips url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/lifestyletips`;

    const actual = URL.lifestyleTips;

    expect(actual).toEqual(expected);
  });

  it('should return lifestyle details url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/lifestyleresponse`;

    const actual = URL.getLifestyleDetails;

    expect(actual).toEqual(expected);
  });

  it('should return lifestyle results url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/LifestyleResults`;

    const actual = URL.lifestyleResults;

    expect(actual).toEqual(expected);
  });

  it('should return employee profile details url', () => {
    getCookie.mockReturnValueOnce(clientId);

    const expected = `/member-service/api/v1/clients/${clientId}/employees/${userId}/details`;

    const actual = URL.employeeProfile(1);

    expect(actual).toEqual(expected);
  });

  it('should return dependent invite url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);

    const expected = `/member-service/api/v1/clients/${clientId}/employees/${userId}/dependents/2/invitation`;

    const actual = URL.inviteDependent(2);

    expect(actual).toEqual(expected);
  });

  it('should return submit lifestyle details url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/lifestyleresponse`;

    const actual = URL.submitLifestyleQuestionnaire;

    expect(actual).toEqual(expected);
  });

  it('should return submit lifestyle history url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/HealthScoreHistory`;

    const actual = URL.lifestyleHealthScoresHistory;

    expect(actual).toEqual(expected);
  });

  it('should return get lifestyle score url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/HealthScore`;

    const actual = URL.lifestyleHealthScore;

    expect(actual).toEqual(expected);
  });

  it('should return face aging categories url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/FaceAging/results`;

    const actual = URL.faceAgingCategories;

    expect(actual).toEqual(expected);
  });

  it('should return face aging image url', () => {
    const original = performance.now;
    performance.now = () => 102;
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const age = 45;
    const category = 'healthy';
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/FaceAging/results/image?age=45&category=healthy&random=102`;

    const actual = URL.faceAgingImage(age, category);

    expect(actual).toEqual(expected);
    performance.now = original;
  });

  it('should return upload face aging image url', () => {
    const original = performance.now;
    performance.now = () => 102;
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/wellness-service/api/v1/clients/${clientId}/users/${userId}/faceaging/image?random=102`;

    const actual = URL.lifestyleFaceImage;

    expect(actual).toEqual(expected);
    performance.now = original;
  });

  it('should return recommendation health', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/recommendation-service/api/v1/clients/${clientId}/users/${userId}/recommendations`;

    const actual = URL.recommendations();

    expect(actual).toEqual(expected);
  });

  it('should return recommendation health for specific health risk', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/recommendation-service/api/v1/clients/${clientId}/users/${userId}/recommendations?risk=bmi`;

    const actual = URL.recommendations('bmi');

    expect(actual).toEqual(expected);
  });

  it('should return privacy policy url when no locale is given', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-privacy-policy/api/v1/clients/${clientId}/legal/privacy-policy`;

    const actual = URL.privacyPolicy();

    expect(actual).toEqual(expected);
  });

  it('should return privacy policy url when loacle is given', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-privacy-policy/api/v1/clients/${clientId}/legal/privacy-policy?locale=zh-HK`;

    const actual = URL.privacyPolicy('zh-HK');

    expect(actual).toEqual(expected);
  });

  it('should return terms and conditions url when loacle is given', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-terms-conditions/api/v1/clients/${clientId}/legal/terms-conditions?locale=zh-HK`;

    const actual = URL.termsConditions('zh-HK');

    expect(actual).toEqual(expected);
  });

  it('should return terms and conditions url when no loacle is given', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-terms-conditions/api/v1/clients/${clientId}/legal/terms-conditions`;

    const actual = URL.termsConditions();

    expect(actual).toEqual(expected);
  });

  it('should return payment list instruments url', () => {
    const paymentUserId = '2';

    const expected = `/payment-service/api/v1/clients/${clientId}/users/${paymentUserId}/instruments`;

    const actual = URL.paymentListInstruments(clientId, paymentUserId);

    expect(actual).toEqual(expected);
  });

  it('should return validate instrument url', () => {
    const paymentUserId = '2';
    const merchantOrderId = '3';

    const expected = `/payment-service/api/v1/clients/${clientId}/users/${paymentUserId}/preauth/${merchantOrderId}`;

    const actual = URL.validateInstrument(
      clientId,
      paymentUserId,
      merchantOrderId,
    );

    expect(actual).toEqual(expected);
  });

  it('should return payment submit instruments url', () => {
    const paymentUserId = '2';

    const expected = `/payment-service/api/v1/clients/${clientId}/users/${paymentUserId}/preauth`;

    const actual = URL.paymentSubmitInstruments(clientId, paymentUserId);

    expect(actual).toEqual(expected);
  });

  it('should return payment create order url', () => {
    const paymentUserId = '2';

    const expected = `/payment-service/api/v1/clients/${clientId}/users/${paymentUserId}/payments`;

    const actual = URL.createOrder(clientId, paymentUserId);

    expect(actual).toEqual(expected);
  });

  it('should return payment validate order url', () => {
    const paymentUserId = '2';
    const merchantOrderId = '3';

    const expected = `/payment-service/api/v1/clients/${clientId}/users/${paymentUserId}/payments/${merchantOrderId}`;

    const actual = URL.validateOrder(clientId, paymentUserId, merchantOrderId);

    expect(actual).toEqual(expected);
  });

  it('should return mpgs session url', () => {
    const expected = `api/v1/mpgssessionurl`;

    const actual = URL.getMPGSSessionUrl;

    expect(actual).toEqual(expected);
  });

  it('should return news letters content url', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-wellness/api/v1/clients/${clientId}/legal/wellness-newsletter-agreement`;

    const actual = URL.newsLetter();

    expect(actual).toEqual(expected);
  });

  it('should return news letters content url with locale provided', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-wellness/api/v1/clients/${clientId}/legal/wellness-newsletter-agreement?locale=en-HK`;

    const actual = URL.newsLetter('en-HK');

    expect(actual).toEqual(expected);
  });

  it('should return get paymentmethods url', () => {
    const expected = `/payment-service/api/v1/clients/1/users/1/payoptionconsult?a=a`;

    const actual = URL.getPaymentMethods('1', '1', { a: 'a' });

    expect(actual).toEqual(expected);
  });

  it('should return puplic contact us url', () => {
    getCookie.mockReturnValueOnce(clientId);
    const expected = `/func-content-contacts/api/v1/clients/${clientId}/contact?locale=en-HK`;

    const actual = URL.contactUsInfo('en-HK');

    expect(actual).toEqual(expected);
  });

  it('should return update cookie language url', () => {
    const expected = `/api/languages/en-HK`;

    const actual = URL.updateCookieLanguage('en-HK');

    expect(actual).toEqual(expected);
  });
  it('should return request change personal email url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/personal-email/request-change`;

    const actual = URL.changePersonalEmail;

    expect(actual).toEqual(expected);
  });

  it('should return verify personal email token url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/personal-email/verify`;

    const actual = URL.verifyPersonalEmailToken(clientId);

    expect(actual).toEqual(expected);
  });

  it('should return request status personal email url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/personal-email/pending-requests`;

    const actual = URL.requestPersonalEmailStatus;

    expect(actual).toEqual(expected);
  });

  it('should return get payment purchase url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/payment-service/api/v1/clients/${clientId}/users/${userId}/purchase/purchaseId/payoptionconsult`;

    const actual = URL.getPaymentPurchaseMethods('purchaseId');

    expect(actual).toEqual(expected);
  });

  it('should return make payment url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/payment-service/api/v1/clients/${clientId}/users/${userId}/purchase/purchaseId/payments`;

    const actual = URL.makePayment('purchaseId');

    expect(actual).toEqual(expected);
  });

  it('should return change infos url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/loginids/request-change`;

    const actual = URL.changeMeInfos;

    expect(actual).toEqual(expected);
  });

  it('should return eWallets url with dependents', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/e-wallet-service/api/v1/clients/${clientId}/members/${userId}/balance?includeDependents=true`;

    const actual = URL.eWallets(true);

    expect(actual).toEqual(expected);
  });

  it('should return eWallets url without dependents', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/e-wallet-service/api/v1/clients/${clientId}/members/${userId}/balance?includeDependents=false`;

    const actual = URL.eWallets(false);

    expect(actual).toEqual(expected);
  });

  it('should return current plan year url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/benefit-service/api/v1/clients/${clientId}/planyears/current`;

    const actual = URL.currentPlanyear;

    expect(actual).toEqual(expected);
  });

  it('should return verify otp url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/phone-number/verify`;

    const actual = URL.verifyOTP;

    expect(actual).toEqual(expected);
  });

  it('should return pending actions request change url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/pending-actions/request-change`;

    const actual = URL.pendingActionRequestChange;

    expect(actual).toEqual(expected);
  });

  it('should return pending actions request url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/pending-actions/request`;

    const actual = URL.pendingActionsRequest;

    expect(actual).toEqual(expected);
  });

  it('should return otp verification request url', () => {
    getCookie.mockReturnValueOnce(clientId).mockReturnValueOnce(userId);
    const expected = `/member-service/api/v1/clients/${clientId}/users/${userId}/pending-actions/verify`;

    const actual = URL.OTPVerification;

    expect(actual).toEqual(expected);
  });
});
