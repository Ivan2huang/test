import { act } from '@testing-library/react';
import {
  initFirebase,
  trackUserInfo,
  logAction,
  logEvent,
  getFirebaseApp,
  trackingAnchor,
  // useFirebaseRemoteConfig,
} from '../firebase';
import CONFIG from '../../constants/config';

afterEach(() => {
  jest.resetModules();
});
// const testHook = callback => {
//   // eslint-disable-next-line react/jsx-filename-extension
//   return render(<TestHook callback={callback} />);
// };
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({
    analytics: jest.fn(() => ({
      logEvent: jest.fn(),
      setUserId: jest.fn(),
      setUserProperties: jest.fn(),
    })),
    remoteConfig: jest.fn().mockReturnValue({
      getAll: jest.fn().mockReturnValue({
        test: '1',
      }),
      fetchAndActivate: jest.fn(),
    }),
  })),
  app: jest.fn(() => ({
    analytics: jest.fn(() => ({
      logEvent: jest.fn(),
      setUserProperties: jest.fn(),
    })),
    remoteConfig: jest.fn().mockReturnValue({
      getAll: jest.fn().mockReturnValue({
        test: '1',
      }),
      fetchAndActivate: jest.fn(),
    }),
  })),
}));
jest.mock('../logger');
describe('Firebase Helper', () => {
  it('should create instant firebase app when initFirebase', async () => {
    const firebaseApp = getFirebaseApp();
    expect(firebaseApp).toBeFalsy();
    initFirebase();
    setTimeout(() => {
      expect(firebaseApp).toBeTruthy();
    });
  });
  it('should setup user tracking information when trackUserInfo', async () => {
    const firebaseApp = getFirebaseApp();
    trackUserInfo({
      clientId: 'clientdev',
      memberId: 'memberId',
      role: 'employee',
    });
    setTimeout(() => {
      const analytics = firebaseApp.analytics();
      expect(analytics.setUserId).toHaveBeenCalled();
      expect(analytics.setUserProperties).toHaveBeenCalled();
    });
  });
  it('should call firebase analytics logEvent if enabledGA config true', async () => {
    const firebaseApp = getFirebaseApp();
    CONFIG.enableGA = true;
    logAction({
      category: 'category',
      action: 'action',
    });
    setTimeout(() => {
      expect(firebaseApp.analytics().logEvent).toHaveBeenCalled();
    });
  });
  it('should not init firebase app if already exist', async () => {
    const firebaseApp = getFirebaseApp();
    CONFIG.enableGA = true;
    logEvent('event_name', 'category', 'action');
    setTimeout(() => {
      expect(firebaseApp.analytics().logEvent).toHaveBeenCalled();
    });
  });
});
describe('Firebase Helper Disabled', () => {
  it('should call firebase analytics logEvent if enabledGA config false', async () => {
    CONFIG.enableGA = false;
    initFirebase();
    const firebaseApp = getFirebaseApp();
    logAction({
      category: 'category',
      action: 'action',
    });
    setTimeout(() => {
      expect(firebaseApp.analytics().logEvent).not.toHaveBeenCalled();
    });
  });
  it('should call firebase analytics logEvent if enabledGA config false', async () => {
    const firebaseApp = getFirebaseApp();
    CONFIG.enableGA = false;
    logEvent('event_name', 'category', 'action');
    setTimeout(() => {
      expect(firebaseApp.analytics().logEvent).not.toHaveBeenCalled();
    });
  });
  it('should call firebase analytics logEvent when click on anchor', () => {
    window.location.assign = jest.fn();
    const firebaseApp = getFirebaseApp();
    const event = {
      preventDefault: jest.fn(),
      target: {
        getAttribute: jest.fn().mockReturnValue('http://dump.com'),
        dataset: {
          category: 'category',
          action: 'action',
        },
      },
    };
    act(() => {
      trackingAnchor(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.target.getAttribute).toHaveBeenCalled();
    });
    setTimeout(() => {
      expect(firebaseApp.analytics().logEvent).toHaveBeenCalled();
    });
  });
});
