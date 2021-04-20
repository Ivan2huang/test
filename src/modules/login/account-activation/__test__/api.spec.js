import { fetchData } from '../../../../helpers/fetch';
import {
  requestOTPVerificationStatus,
  requestOTPVerification,
  resendOTPRequest,
  fetchIdentities,
} from '../api';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../helpers/url', () => ({
  pendingActionRequestChange: 'test/pending-action-request-change',
  pendingActionsRequest: 'test/pending-action-request',
  OTPVerification: 'test/otp-verification',
  identities: 'test/identities',
}));

describe('account activation API', () => {
  it('should call login request change api', async () => {
    await requestOTPVerificationStatus();
    expect(fetchData).toHaveBeenCalledWith(
      'get',
      'test/pending-action-request-change',
      null,
      true,
    );
  });

  it('should call pending action request api', async () => {
    await resendOTPRequest();
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/pending-action-request',
      { action: 'FirstLoginOTPVerification' },
      true,
    );
  });

  it('should call otp verification api', async () => {
    await requestOTPVerification('123456');
    expect(fetchData).toHaveBeenCalledWith(
      'post',
      'test/otp-verification',
      { action: 'FirstLoginOTPVerification', token: '123456' },
      true,
    );
  });

  it('should call fetch identities api', async () => {
    await fetchIdentities();
    expect(fetchData).toHaveBeenCalledWith('get', 'test/identities');
  });
});
