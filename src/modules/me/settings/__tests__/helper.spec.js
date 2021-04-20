import { clearLocalStorage } from '../helper';

describe('Profile Settings Helper', () => {
  it('should clear local storage', () => {
    window.localStorage.setItem('testKey', 'testValue');
    clearLocalStorage();
    expect(localStorage.length).toEqual(0);
    expect(localStorage.getItem('testKey')).toEqual(null);
  });
});
