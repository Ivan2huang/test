const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps');

const transformSupportedLanguageEnv = localeValues => {
  if (!localeValues) return [process.env.DEFAULT_LANGUAGE || 'en-HK'];
  return localeValues.split(',').map(item => item.trim());
};

module.exports = withSourceMaps(
  withCSS({
    distDir: '../dist',
    webpack(config, options) {
      const originalEntry = config.entry;
      const filesToTranspile = ['react-intl'];
      const re = new RegExp(
        `node_modules[/\\\\]((${filesToTranspile.join('|')})[/\\\\]).*`,
      );

      config.module.rules.push({
        test: /\.(js|jsx)$/,
        include: file => re.test(file),
        use: [options.defaultLoaders.babel],
      });

      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js']) {
          entries['main.js'].unshift('../polyfills.js');
        }
        return entries;
      };

      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
        config.node = {
          fs: 'empty',
        };
      }

      return config;
    },

    publicRuntimeConfig: {
      clientId: process.env.CLIENT_ID,
      authClientId: process.env.AUTH0_CLIENT_ID,
      defaultLanguage: process.env.DEFAULT_LANGUAGE,
      googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
      sentryDSN: process.env.SENTRY_DSN,
      sentryENV: process.env.SENTRY_ENV,
      webLink: process.env.AUTH0_REDIRECT_URL,
      appStoreLink: process.env.APP_STORE_LINK,
      playStoreLink: process.env.PLAY_STORE_LINK,
      featureToggleLifestyle: process.env.FEATURE_TOGGLE_LIFESTYLE === 'true',
      featureToggleLifestyleSuggestions:
        process.env.FEATURE_TOGGLE_LIFESTYLE_SUGGESTIONS === 'true',
      featureToggleClusteredMap:
        process.env.FEATURE_TOGGLE_CLUSTRED_MAP === 'true',
      commitSHA: process.env.COMMIT_SHA,
      minSpouseAge: parseInt(process.env.MIN_SPOUSE_AGE, 10),
      minChildAge: parseInt(process.env.MIN_CHILD_AGE, 10),
      maxChildAge: parseInt(process.env.MAX_CHILD_AGE, 10),
      shopUrl: process.env.SHOP_URL,
      masterCardSession: process.env.MASTER_CARD_SESSION,
      webFlavor: process.env.WEB_FLAVOR,
      environment: process.env.ENVIRONMENT,
      appVersionName: process.env.APP_VERSION_NAME,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      enableGA: process.env.ENABLE_GA === 'true',
      enableFeatureToggle: process.env.ENABLE_FEATURE_TOGGLE === 'true',
      enableSentryPayment: process.env.ENABLE_SENTRY_PAYMENT === 'true',
      paymentTermOfUseUrl:
        process.env.PAYMENT_TERM_OF_USE_URL ||
        'https://www.healthpassbyocbc.sg/terms-conditions/',
      featureToggleKey: process.env.FEATURE_TOGGLE_KEY,
      paymentJwtDuration: parseInt(process.env.PAYMENT_JWT_DURATION, 10) || 5,
      enableETPAService: process.env.ENABLE_ETPA_SERVICE === 'true',
      useExternalBenefits: process.env.USE_EXTERNAL_BENEFITS === 'true',
      useCurrencySymbol: process.env.USE_CURRENCY_SYMBOL === 'true',
      enableRefreshToken:
        process.env.FEATURE_TOGGLE_C2_5798_ENABLE_REFRESH_TOKEN === 'true' ||
        process.env.FEATURE_TOGGLE_AWS_COGNITO === 'true',
      CSEmail: process.env.IDENTITY_CS_EMAIL,
      disablePendingAction: process.env.DISABLE_PENDING_ACTION === 'true',
      logLevel: process.env.LOG_LEVEL || 'info',
      themeCode: process.env.THEME_CODE || 'balboa',
      useProductNameFromCMS: process.env.USE_PRODUCT_NAME_FROM_CMS === 'true',
      useLifeStyleTipFromCMS: process.env.USE_LIFESTYLE_TIP_FROM_CMS === 'true',
      supportedLanguages: transformSupportedLanguageEnv(
        process.env.SUPPORTED_LANGUAGES,
      ),
    },
    generateBuildId: async () => {
      const buildId = process.env.COMMIT_SHA;

      if (buildId) {
        return buildId;
      }

      return null;
    },
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 25 * 1000,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 10,
    },
  }),
);
