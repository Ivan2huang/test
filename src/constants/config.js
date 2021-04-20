import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const CONFIG = {
  ...publicRuntimeConfig,
  dateFormat: 'd MMM yyyy',
  dateCustomChineseFormat: "yyyy'年'M'月'dd'日'",
  monthDayCustomChineseFormat: "M'月'dd'日'",
  monthDayCustomEnglishFormat: 'd MMM',
  dateCustomThaiFormat: 'ddวัน mmเดือน yyyyปี',
  maxRecentSearch: 4,
  locales: {
    ENGLISH: 'en-HK',
    CHINESE: 'zh-HK',
    THAI: 'th-TH',
  },
  fakeData: false,
};

export const enabledFeatureToggledForClusteredMap = () =>
  publicRuntimeConfig.featureToggleClusteredMap;

export default CONFIG;
