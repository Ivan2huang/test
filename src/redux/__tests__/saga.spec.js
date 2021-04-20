import { fork } from 'redux-saga/effects';

import rootSaga from '../saga';
import { forgotPasswordSaga } from '../../modules/login/forgot-password';
import { resetPasswordSaga } from '../../modules/login/reset-password';
import { claimSaga } from '../../modules/claims';
import { makeClaimSaga } from '../../modules/claims/make-claim';
import { claimDetailsSaga } from '../../modules/claims/claim-details';
import { clinicSaga } from '../../modules/doctors/clinic';
import { meSaga } from '../../modules/me';
import { inviteDependentSaga } from '../../modules/me/details/invite';
import { settingsSaga } from '../../modules/me/settings';
import { usefulDocumentsSaga } from '../../modules/benefits/documents';
import { helpSaga } from '../../modules/benefits/help';
import { lifestyleSaga } from '../../modules/lifestyle';
import { lifestyleTipsSaga } from '../../modules/lifestyle/general-tips';
import { questionnaireSaga } from '../../modules/lifestyle/questionnaire';
import { lifestyleResultsSaga } from '../../modules/lifestyle/lifestyle-results';
import { lifestyleHealthScoresHistorySaga } from '../../modules/lifestyle/lifestyle-history';
import { lifestyleScoreSaga } from '../../modules/lifestyle/lifestyle-score';
import { faceAgingSaga } from '../../modules/lifestyle/face-aging';
import { privacySaga } from '../../modules/legal/privacy';
import { termsSaga } from '../../modules/legal/terms';
import { paymentSaga } from '../../modules/payment';
import { validateActivationSaga } from '../../modules/login/activation';
import { newsLetterSaga } from '../../modules/legal/newsletter';
import { miscSaga } from '../../modules/misc';
import { recommendationsSaga } from '../../modules/common/recommendations';
import { walletSaga } from '../../modules/benefits/wallets';
import { accountActivationSaga } from '../../modules/login/account-activation';

jest.mock('../../modules/login/forgot-password', () => ({
  *forgotPasswordSaga() {
    yield '';
  },
}));

jest.mock('../../modules/login/reset-password', () => ({
  *resetPasswordSaga() {
    yield '';
  },
}));

jest.mock('../../modules/claims', () => ({
  *claimSaga() {
    yield '';
  },
}));

jest.mock('../../modules/claims/make-claim', () => ({
  *makeClaimSaga() {
    yield '';
  },
}));

jest.mock('../../modules/claims/claim-details', () => ({
  *claimDetailsSaga() {
    yield '';
  },
}));

jest.mock('../../modules/doctors/clinic', () => ({
  *clinicSaga() {
    yield '';
  },
}));

jest.mock('../../modules/me', () => ({
  *meSaga() {
    yield '';
  },
}));

jest.mock('../../modules/me/details/invite', () => ({
  *inviteDependentSaga() {
    yield '';
  },
}));

jest.mock('../../modules/me/settings', () => ({
  *settingsSaga() {
    yield '';
  },
}));

jest.mock('../../modules/benefits/documents', () => ({
  *usefulDocumentsSaga() {
    yield '';
  },
}));

jest.mock('../../modules/benefits/help', () => ({
  *helpSaga() {
    yield '';
  },
}));

jest.mock('../../modules/lifestyle', () => ({
  *lifestyleSaga() {
    yield '';
  },
}));

jest.mock('../../modules/lifestyle/general-tips', () => ({
  *lifestyleTipsSaga() {
    yield '';
  },
}));
jest.mock('../../modules/lifestyle/lifestyle-results', () => ({
  *lifestyleResultsSaga() {
    yield '';
  },
}));

jest.mock('../../modules/lifestyle/questionnaire', () => ({
  *questionnaireSaga() {
    yield '';
  },
}));

jest.mock('../../modules/lifestyle/lifestyle-history', () => ({
  *lifestyleHealthScoresHistorySaga() {
    yield '';
  },
}));

jest.mock('../../modules/lifestyle/lifestyle-score', () => ({
  *lifestyleScoreSaga() {
    yield '';
  },
}));

jest.mock('../../modules/lifestyle/face-aging', () => ({
  *faceAgingSaga() {
    yield '';
  },
}));

jest.mock('../../modules/common/recommendations', () => ({
  *recommendationsSaga() {
    yield '';
  },
}));

jest.mock('../../modules/legal/privacy', () => ({
  *privacySaga() {
    yield '';
  },
}));

jest.mock('../../modules/legal/terms', () => ({
  *termsSaga() {
    yield '';
  },
}));

jest.mock('../../modules/payment', () => ({
  *paymentSaga() {
    yield '';
  },
}));

jest.mock('../../modules/login/activation', () => ({
  *validateActivationSaga() {
    yield '';
  },
}));

jest.mock('../../modules/legal/newsletter', () => ({
  *newsLetterSaga() {
    yield '';
  },
}));

describe('Root Saga', () => {
  it('should fork sagas and complete it', () => {
    const generator = rootSaga();

    let next = generator.next();
    expect(next.value).toEqual(fork(forgotPasswordSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(resetPasswordSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(claimSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(makeClaimSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(claimDetailsSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(clinicSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(meSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(inviteDependentSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(settingsSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(lifestyleSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(lifestyleTipsSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(questionnaireSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(lifestyleResultsSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(lifestyleHealthScoresHistorySaga));
    next = generator.next();
    expect(next.value).toEqual(fork(lifestyleScoreSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(faceAgingSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(privacySaga));
    next = generator.next();
    expect(next.value).toEqual(fork(termsSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(paymentSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(validateActivationSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(newsLetterSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(miscSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(recommendationsSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(walletSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(usefulDocumentsSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(helpSaga));
    next = generator.next();
    expect(next.value).toEqual(fork(accountActivationSaga));
    next = generator.next();
    expect(next).toEqual({ done: true, value: undefined });
  });
});
