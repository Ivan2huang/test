/**
 * express服务器文件
 * @type {createApplication}
 */
console.log('begin  server.js');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const prometheus = require('prom-client');

const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();
const auth0 = require('./auth0');
const authCognito = require('./authCognito');
const useServiceProxy = require('./serviceProxy');
const useFuncProxy = require('./funcProxy');

const setAuthorizationHeader = (req, res, expressNext) => {
  const { path = '', cookies } = req;
  console.log('server.js setAuthorizationHeader path=', path);
  if (path.startsWith('/payment-service/') && cookies.payment_jwt) {
    req.headers.authorization = `Bearer ${cookies.payment_jwt}`;
  } else if (cookies.access_token && !req.headers.authorization) {
    req.headers.authorization = `Bearer ${cookies.access_token}`;
  }

  expressNext();
};

const clearSignedCookies = (req, res, expressNext) => {
  if (!req.cookies.logged_in) {
    res.clearCookie('access_token');
    res.clearCookie('id_token');
    res.clearCookie('user_id');
  }
  expressNext();
};

const captureClientIdFromUrl = (req, res, expressNext) => {
  Object.keys(req.query).forEach(function toLowerCase(key) {
    req.query[key.toLowerCase()] = req.query[key];
  });
  console.log('server.js captureClientIdFromUrl req.query=', req.query);
  const { clientid } = req.query;
  const oneDay = 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + 365 * oneDay);
  const options = {
    secure: !dev,
    httpOnly: false,
    signed: false,
    expires,
  };
  if (clientid && !req.cookies.logged_in) {
    res.cookie('client_id', clientid.toLowerCase(), options);
    res.locals.client_id = clientid.toLowerCase();
  }
  if (req.cookies.logged_in && req.cookies.client_id) {
    res.cookie('client_id', req.cookies.client_id.toLowerCase(), options);
    res.locals.client_id = req.cookies.client_id.toLowerCase();
  }
  expressNext();
};

const removeTrailingSlashes = (req, res, expressNext) => {
  const isTrailingSlash = req.path.substr(-1) === '/' && req.path.length > 1;
  console.log('server.js removeTrailingSlashes req.path=', req.path);
  // console.log(
  //   'server.js removeTrailingSlashes isTrailingSlash=',
  //   isTrailingSlash,
  // );

  if (isTrailingSlash) {
    const query = req.url.slice(req.path.length);
    const normalizeUrl = req.path.slice(0, -1) + query;
    res.redirect(301, normalizeUrl);
  } else {
    expressNext();
  }
};

const supportedLanguages = process.env.SUPPORTED_LANGUAGES;

app.prepare().then(() => {
  let server = express(); // express实例

  server.disable('x-powered-by');
  server.use(removeTrailingSlashes);
  server.use(cookieParser());
  server.use(setAuthorizationHeader);
  server.use(clearSignedCookies);
  server.use(captureClientIdFromUrl);

  if (process.env.FEATURE_TOGGLE_AWS_COGNITO === 'true') {
    console.log('server.js authCognito');
    server = authCognito(server);
  } else {
    server = auth0(server);
  }
  server = useServiceProxy(server);
  server = useFuncProxy(server);

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  // prometheus metrics endpoint
  server.get('/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
  });

  /**
   * 由 next.js 来进行 服务端渲染 /claims/claim-details/ 这个 路由
   */
  server.get('/claims/claim-details/:id', (req, res) => {
    console.log('server.js render claim-details id=', req.params.id);
    return app.render(req, res, '/claims/claim-details', { id: req.params.id });
  });

  server.get('/api/languages/:code', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { code } = req.params;
    if (supportedLanguages.includes(code)) {
      res.cookie('lang', req.params.code);
      res.end(JSON.stringify({ success: true }));
    } else {
      res.end(JSON.stringify({ success: false }));
    }
  });

  server.get('/payment-purchase', (req, res) => {
    return app.render(req, res, '/payment/payment-purchase', {
      query: req.query,
    });
  });

  server.post('/payment-purchase-result', (req, res) => {
    return app.render(req, res, '/payment/payment-purchase-result');
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.post('/preauth', (req, res) => {
    return app.render(req, res, '/payment/preauth', { query: req.query });
  });

  server.post('/preauth-result', (req, res) => {
    return app.render(req, res, '/payment/preauth-result');
  });

  server.post('/payment-shop', (req, res) => {
    return app.render(req, res, '/payment/payment-shop', { query: req.query });
  });

  server.post('/payment-shop-result', (req, res) => {
    return app.render(req, res, '/payment/payment-shop-result');
  });

  if (dev) {
    // 搭建HTTPs加密服务器
    https
      .createServer(
        {
          key: fs.readFileSync('server.key'),
          cert: fs.readFileSync('server.cert'),
        },
        server,
      ) // 启动服务器，监听指定端口
      .listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`> Ready on ${process.env.AUTH0_REDIRECT_URL}:${port}`);
      });
  } else {
    server.listen(port, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on ${process.env.AUTH0_REDIRECT_URL}:${port}`);
    });
  }
});
