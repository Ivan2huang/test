const proxy = require('http-proxy-middleware');

const serviceProxies = [
  {
    identifier: '/auth-service',
    target:
      process.env.FEATURE_TOGGLE_AWS_COGNITO === 'true'
        ? process.env.COGNITO_SERVICE
        : process.env.AUTH_SERVICE,
  },
  {
    identifier: '/claim-service',
    target: process.env.CLAIM_SERVICE,
  },
  {
    identifier: '/panel-service',
    target: process.env.PANEL_SERVICE,
  },
  {
    identifier: '/benefit-service',
    target: process.env.BENEFIT_SERVICE,
  },
  {
    identifier: '/member-service',
    target: process.env.MEMBER_SERVICE,
  },
  {
    identifier: '/wallet-service',
    target: process.env.WALLET_SERVICE,
  },
  {
    identifier: '/e-wallet-service',
    target: process.env.E_WALLET_SERVICE,
  },
  {
    identifier: '/content-service',
    target: process.env.CONTENT_SERVICE,
  },
  {
    identifier: '/wellness-service',
    target: process.env.WELLNESS_SERVICE,
  },
  {
    identifier: '/recommendation-service',
    target: process.env.RECOMMENDATION_SERVICE,
  },
  {
    identifier: '/payment-service',
    target: process.env.PAYMENT_SERVICE,
  },
  process.env.ENABLE_ETPA_SERVICE && {
    identifier: '/etpa-service',
    target: process.env.ETPA_SERVICE,
  },
].filter(Boolean);

module.exports = server => {
  serviceProxies.forEach(({ identifier, target }) => {
    server.use(
      identifier,
      proxy({
        target,
        changeOrigin: true,
        pathRewrite: {
          [`^${identifier}`]: '',
        },
      }),
    );
  });
  return server;
};
