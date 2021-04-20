import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/remote-config';
import CONFIG from '../constants/config';
import logger from './logger';

const config = {
  apiKey: CONFIG.firebaseApiKey,
  authDomain: CONFIG.firebaseAuthDomain,
  databaseURL: CONFIG.firebaseDatabaseUrl,
  projectId: CONFIG.firebaseProjectId,
  storageBucket: CONFIG.firebaseStorageBucket,
  messagingSenderId: CONFIG.firebaseMessagingSenderId,
  appId: CONFIG.firebaseAppId,
  measurementId: CONFIG.firebaseMeasurementId,
};

let firebaseApp;

export const initFirebase = () => {
  if (!firebaseApp) {
    firebaseApp = firebase.initializeApp(config);
  } else {
    firebaseApp = firebase.app();
  }
};

export const trackUserInfo = ({ clientId, memberId, role }) => {
  const analytics = firebaseApp.analytics();
  analytics.setUserId(memberId);
  analytics.setUserProperties({
    client_id: clientId,
    user_type: role,
  });
};

export const logEvent = (eventName, category, action, label, options = {}) => {
  if (CONFIG.enableGA) {
    firebaseApp.analytics().logEvent(eventName, {
      category,
      action,
      label,
      ...options,
    });
  }
};

export const logAction = ({ category, action, ...restParams }) => {
  if (CONFIG.enableGA) {
    firebaseApp.analytics().logEvent('user_action', {
      category,
      action,
      ...restParams,
    });
  }
};

export const trackingAnchor = e => {
  e.preventDefault();
  const anchorNode = e.target;
  const href = anchorNode.getAttribute('href');
  const { category, action } = anchorNode.dataset;
  logAction({
    category,
    action,
  });
  window.location.assign(href);
};

export const getFirebaseApp = () => firebaseApp;

export const getRemoteFeatureChecker = async ({ parameterName }) => {
  if (!firebaseApp) {
    return () => false;
  }

  const remoteConfig = firebaseApp.remoteConfig();
  remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
  };
  let featureMap = {};
  try {
    await remoteConfig.fetchAndActivate();
    const remoteValues = await remoteConfig.getAll();
    if (remoteValues && remoteValues[parameterName]) {
      featureMap = JSON.parse(remoteValues[parameterName].asString());
    }
  } catch (e) {
    logger.error('---getRemoteFeatureChecker -> ERROR---', e);
  }
  return featureName => {
    return featureMap[featureName];
  };
};
