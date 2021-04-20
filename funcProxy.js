const proxy = require('http-proxy-middleware');

const funcIdentifiers = [
  '/func-content-product',
  '/func-content-contacts',
  '/func-content-documents',
  '/func-content-help',
  '/func-content-terms-conditions',
  '/func-content-terms-conditions-admin',
  '/func-content-privacy-policy',
  '/func-content-privacy-policy-admin',
  '/func-content-wellness',
  '/func-benefit-handle-external-benefits',
  '/func-benefit-handle-benefits',
  '/func-panel-handle-panels',
  '/func-content-documents-download',
  '/func-content-note',
  '/func-content-tip',
];

const target = process.env.OL_SERVICE;
module.exports = server => {
  funcIdentifiers.forEach(identifier => {
    server.use(
      identifier,
      proxy({
        target,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          [`^${identifier}`]: `function/${identifier.replace('/func-', '')}`,
        },
      }),
    );
  });

  return server;
};
