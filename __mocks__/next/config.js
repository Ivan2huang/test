const getConfig = () => {
  return {
    publicRuntimeConfig: {
      clientId: 'testClientId',
      defaultLanguage: 'en',
      googleMapApiKey: 'test-api-key',
      appStoreLink: 'app-store-link',
      playStoreLink: 'play-store-link',
      featureToggleLifestyle: 'true',
      featureToggleClusteredMap: 'true',
    },
  };
};
export default getConfig;
