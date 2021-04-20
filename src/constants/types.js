import IMAGES from './images';

export const PAYMENT_METHODS = {
  WALLET: 'WALLET',
  CREDIT_CARD: 'CREDIT_CARD',
  MIX_CREDIT_CARD: 'MIX_CC',
  MIX_WALLET: 'MIX_',
  MOCK: 'MOCK',
};

export const NOTIFICATION_TYPES = {
  WARNING: 'Warning',
  ERROR: 'Error',
};

export const LIFESTYLE_TIPS = {
  GENERAL: 'GeneralHealth',
  LIFESTYLE: 'LifeStyle',
};

export const DEFAULT_LANGUAGE_NAME_MAPPING = {
  'en-HK': 'UK English',
  'zh-HK': '中文 (繁體)',
  'th-TH': 'ไทย',
};

export const FLAG_IMAGE_MAPPING = {
  'en-HK': IMAGES.FLAG_EN,
  'zh-HK': IMAGES.FLAG_ZH,
  'th-TH': IMAGES.FLAG_TH,
};

export const CURRENCY_MAPPING = {
  HKD: 'HK$',
  SGD: 'SG$',
};
