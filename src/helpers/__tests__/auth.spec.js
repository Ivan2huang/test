import { getCookie, hasCookie } from '../auth';
import { error } from '../../constants/auth';

describe('login error keys', () => {
  it('should have the Unauthorized key', () => {
    expect(
      Object.keys(error.login.messageKeys).includes('Unauthorized'),
    ).toBeTruthy();
    expect(error.login.messageKeys.Unauthorized).toEqual(
      'login.error.unauthorized',
    );
  });
});

describe('cookie', () => {
  it('getCookie', () => {
    document.cookie = 'id_token=dummyToken;';
    const idToken = getCookie('id_token');

    expect(idToken).toEqual('dummyToken');
  });
});

describe('hasCookie', () => {
  it('should return true if cookie is present on client side', () => {
    document.cookie = 'id_token=dummyToken';
    const isPresent = hasCookie('id_token');

    expect(isPresent).toBeTruthy();
  });

  it('should return false if cookie is missing on client side', () => {
    document.cookie = 'id_token=';
    const isPresent = hasCookie('id_token');

    expect(isPresent).toBeFalsy();
  });
});
