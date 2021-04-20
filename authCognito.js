const request = require('request');
const jwtDecode = require('jwt-decode');
const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const logger = require('./src/helpers/logger');
require('request-to-curl');

const CODE_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
const ONE_DAY = 24 * 60 * 60 * 1000;
const {
  OL_SERVICE,
  AUTH0_REDIRECT_URL,
  AUTH0_PENDING_ACTION,
  NODE_ENV,
  DEFAULT_LANGUAGE,
  AWS_COGNITO_EXCHANGE_TOKEN_URL,
  COGNITO_SERVICE,
} = process.env;

const isJsonFormat = obj => {
  if (!obj) return false;
  if (typeof obj === 'object') return true;
  try {
    JSON.parse(obj);
  } catch (e) {
    return false;
  }
  return true;
};
const IS_NOT_DEV = NODE_ENV !== 'development';
const ERROR_PAGE = '/error';

const base64URL = string => {
  return Base64.stringify(string)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const generateCodeVerifier = (length = 128) => {
  let text = '';
  for (let i = 0; i < length; i += 1) {
    text += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
  }
  return text;
};

const generateCodeChallenge = codeVerifier => {
  const codeChallenge = base64URL(SHA256(codeVerifier));
  return codeChallenge;
};

const getCookie = (cookies, name) => {
  console.log('authCognito.js getCookie cookies=', cookies);
  console.log('authCognito.js getCookie name=', name);

  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);
  console.log('authCognito.js getCookie parts=', parts);
  const pop = parts.pop();
  console.log('authCognito.js getCookie pop=', pop);
  const split = pop.split(';');
  /**
   * split:[
   '',
   ' authClientId=mv4614gkunlqfeiv3ciqj61pg',
   ' code_verifier=jmgpzcF-ce-4pnzt6P2Uldou~t5c5iGr-F.mcG6uc1O~XRTWzG7u32o.QAuVMXTuFV4BEJIybb55Y_PlM2utK2wUu0VnlH19Fijaerk07yq9Kwm.-TQDszzSvv-36jSK',
   ' _ga=GA1.1.1666620241.1617864695',
   ' _ga_ZE6LLT2004=GS1.1.1617864695.1.0.1617864695.60'
   ]
   */
  console.log('authCognito.js getCookie split=', split);
  const shift = split.shift(); // 把数组的第一个元素从其中删除，并返回第一个元素的值
  console.log('authCognito.js getCookie shift=', shift); // shift:''
  return shift;
};

const getCognitoAuthToken = (code, codeVerifier, authClientId) => ({
  code,
  client_id: authClientId,
  redirect_uri: AUTH0_REDIRECT_URL,
  code_verifier: codeVerifier,
  grant_type: 'authorization_code',
});

const extractTokens = body => {
  const {
    error,
    access_token: accessToken,
    id_token: idToken,
    refresh_token: refreshToken,
  } = JSON.parse(body);
  if (error) {
    return {
      error,
    };
  }
  const jwtData = jwtDecode(idToken);
  const accessTokenData = jwtDecode(accessToken);
  const lang = jwtData.lang || DEFAULT_LANGUAGE;
  const pendingActions = accessTokenData[AUTH0_PENDING_ACTION] || '';

  return {
    accessToken,
    refreshToken,
    idToken,
    lang,
    pendingActions,
  };
};

const getExpires = token => {
  return token && new Date(jwtDecode(token).exp * 1000);
};

const updateCookies = (res, cookieData) => {
  const {
    idToken,
    accessToken,
    refreshToken,
    userId,
    lang,
    pendingActions,
    expires,
    idTokenExpires,
  } = cookieData;
  const neverExpiryTime = new Date(Date.now() + 365 * ONE_DAY);
  const secureCookieOptions = {
    expires: neverExpiryTime,
    secure: IS_NOT_DEV,
    httpOnly: true,
    signed: false,
  };
  const defaultCookieOptions = {
    expires: neverExpiryTime,
    secure: IS_NOT_DEV,
    httpOnly: false,
    signed: false,
  };

  res.clearCookie('state');

  res.cookie('access_token', accessToken, { ...secureCookieOptions, expires });
  if (refreshToken) {
    res.cookie('refresh_token', refreshToken, secureCookieOptions);
  }
  res.cookie('id_token', idToken, {
    ...secureCookieOptions,
    expires: idTokenExpires,
  });
  if (userId) {
    res.cookie('user_id', userId, defaultCookieOptions);
  }
  res.cookie('logged_in', true, defaultCookieOptions);
  res.cookie('lang', lang, defaultCookieOptions);
  res.cookie('pending_actions', pendingActions);

  res.locals.accessToken = accessToken;
  res.locals.refreshToken = refreshToken;
  res.locals.userId = userId;
  res.locals.isLoggedIn = true;
  res.locals.idToken = idToken;
  res.locals.lang = lang;
  res.locals.pendingActions = pendingActions;
};

const getUserInfo = (req, res, tokenData, next) => {
  const { state } = req.query;
  const data = extractTokens(tokenData);

  const requestUrl = `${OL_SERVICE}/function/auth-handle-userinfo/oauth/userinfo`;

  logger.log('---getUserInfo -> Accessing UserInfo---');

  request.get(
    {
      url: requestUrl,
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
      },
      json: true,
    },
    (error, response, body) => {
      if (error) {
        logger.error('---getUserInfo -> ERROR---', { requestUrl, error });
        console.log('authCognito.js getUserInfo ERROR');
        return res.redirect(ERROR_PAGE);
      }
      if (!isJsonFormat(body)) {
        logger.error('---getUserInfo -> INVALID Body---', body);
        console.log('authCognito.js getUserInfo INVALID Body');

        return res.redirect(ERROR_PAGE);
      }
      logger.log(
        '---getUserInfo -> statusCode:',
        response && response.statusCode,
      );
      /**
       * body:{"clientId":"cxaref-dev","userId":"147","role":"member","name":"Huy
       * Duong","pendingActions":[],"externalId":"huyduong","isCXA1Integration":false}
       */
      logger.log('---getUserInfo -> body:', body);
      logger.log('---getUserInfo -> Successfully Get UserInfo---');

      updateCookies(res, {
        ...data,
        userId: body.userId,
        pendingActions: body.pendingActions,
        expires: getExpires(data.accessToken),
        idTokenExpires: getExpires(data.idToken),
      });
      if (decodeURIComponent(req.cookies.state) === state) {
        console.log('authCognito.js getUserInfo redirect state=', state);
        return res.redirect(state);
      }

      return next();
    },
  );
};

// 访问根路由 时 回调, 如果在
// https://cxarefdev.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?redirect_uri=https%3A%2F%2Flocalhost.com&scope=openid%20cxa%2Fprofile.ecommerce.read%20cxa%2Fprofile.write%20cxa%2FAll&response_type=CODE&code_challenge_method=S256&code_challenge=JvsnwJ6fscLuwfzWLHJqxKVh3IUJ-9ZFGwaYXWm4w_g&client_id=mv4614gkunlqfeiv3ciqj61pg&state=%2F  这个 SSO 登录页面 登录成功后,也会 重定向到 根路由,此时 req.query 里就有 code 了
const setToken = (req, res, next) => {
  const { code } = req.query;
  console.log('authCognito.js setToken req.query=', req.query);

  if (!code) {
    // code query parametered is needed, if it is missing, please check on cognito side why it didn't return
    // 感觉如果未登录过,第一次进首页肯定没有code
    console.log('authCognito.js setToken code=', code);
    return next();
  }

  logger.log('---Start Exchange Cognito Token By Code---');

  const payload = getCognitoAuthToken(
    code,
    req.cookies.code_verifier,
    req.cookies.authClientId,
  );
  return request.post(
    {
      url: AWS_COGNITO_EXCHANGE_TOKEN_URL,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: payload,
    },
    (error, response, body) => {
      if (error) {
        logger.error('---Exchange Cognito Token -> ERROR---', {
          url: AWS_COGNITO_EXCHANGE_TOKEN_URL,
          error,
          payload,
        });
        return res.redirect(ERROR_PAGE);
      }
      if (isJsonFormat(body)) {
        const bodyObj = JSON.parse(body);
        if (bodyObj.error) {
          logger.error('---Exchange Cognito Token -> Body ERROR---', {
            url: AWS_COGNITO_EXCHANGE_TOKEN_URL,
            error,
            payload,
          });
          return res.redirect(ERROR_PAGE);
        }
      } else {
        logger.error('---Exchange Cognito Token -> INVALID Body---', body);
        return res.redirect(ERROR_PAGE);
      }

      logger.log(
        '---Exchange Cognito Token -> statusCode:',
        response && response.statusCode,
      );
      logger.log('---Exchange Cognito Token -> body:', body);
      logger.log('---setToken -> Successfully Exchanged Cognito Token---');

      return getUserInfo(req, res, body, next);
    },
  );
};

const clearCookies = res => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.clearCookie('code_verifier');
  res.clearCookie('id_token');
  res.clearCookie('user_id');
  res.clearCookie('pending_actions');
  res.clearCookie('logged_in');
  res.clearCookie('authClientId');
};

const handleState = (req, res) => {
  const { path = '' } = req.query;
  let state = '';
  const encodedPath = encodeURIComponent(path || '/');
  res.cookie('state', encodedPath, {
    secure: IS_NOT_DEV,
    httpOnly: true,
    signed: false,
  });
  state = encodedPath;

  return state;
};

const renewToken = (req, res) => {
  clearCookies(res);
  return res.redirect('/login');
};

const getClientId = (req, res) => {
  console.log('authCognito.js getClientId');
  const clientId =
    getCookie(
      req.headers.cookie,
      /* 'client_id' 可能是此处传的 client_id 导致找不到 clientId */ 'client_id',
    ) || res.locals.client_id;
  console.log(
    'authCognito.js getClientId req.headers.cookie=',
    req.headers.cookie,
  );
  console.log(
    'authCognito.js getClientId res.locals.client_id=',
    res.locals.client_id,
  );
  console.log('authCognito.js getClientId clientId=', clientId);

  return clientId;
};

const handleCognitoLogout = (
  req,
  res,
  { logoutUrl, codeVerifier, authClientId, options },
) => {
  const { access_token: accessToken } = req.cookies;
  return request.get(
    {
      url: `${COGNITO_SERVICE}api/v1/OAuth/logout`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    (error, response, body) => {
      if (!error) {
        logger.log('---handleCognitoLogout -> SUCCESS ---', {
          body,
          statusCode: response && response.statusCode,
        });
        clearCookies(res);
        res.cookie('code_verifier', codeVerifier, options);
        res.cookie('authClientId', authClientId, options);
        res.redirect(logoutUrl);
      } else {
        logger.error('---handleCognitoLogout -> ERROR---', {
          error,
          COGNITO_SERVICE,
          statusCode: response && response.statusCode,
        });
        console.log('authCognito.js handleCognitoLogout redirect(ERROR_PAGE)');
        res.redirect(ERROR_PAGE);
      }
    },
  );
};

const handleAWSCognitoAuth = (req, res, isLogout) => {
  // console.log('authCognito.js handleAWSCognitoAuth req=', req);

  const clientId = getClientId(req, res);
  console.log('authCognito.js handleAWSCognitoAuth clientId=', clientId);

  if (!clientId) {
    // setToken 方法的 code 如果是 undefined , 可能导致 clientId 也是
    console.log('authCognito.js handleAWSCognitoAuth redirect(ERROR_PAGE)');
    return res.redirect(ERROR_PAGE); // 注释此句可以避免重定向到错误页面
  }
  const state = handleState(req, res);
  console.log('authCognito.js handleAWSCognitoAuth state=', state);
  const codeVerifier = generateCodeVerifier();
  console.log(
    'authCognito.js handleAWSCognitoAuth codeVerifier=',
    codeVerifier,
  );
  const codeChallenge = generateCodeChallenge(codeVerifier);
  console.log(
    'authCognito.js handleAWSCognitoAuth codeChallenge=',
    codeChallenge,
  );
  const requestUrl = `${OL_SERVICE}/function/auth-handle-dynamic-login-url/api/v1/clients/${clientId}/login-url?code_challenge=${codeChallenge}&redirect_uri=${AUTH0_REDIRECT_URL}`;
  logger.log('---handleAWSCognitoAuth -> requestUrl:', requestUrl);
  console.log('authCognito.js handleAWSCognitoAuth requestUrl=', requestUrl);
  return request.get(
    {
      url: requestUrl,
    },
    (error, response, body) => {
      if (error) {
        logger.error('---handleAWSCognitoAuth -> ERROR---', {
          requestUrl,
          error,
        });
        console.log(
          'authCognito.js handleAWSCognitoAuth redirect(ERROR_PAGE)222',
        );

        return res.redirect(ERROR_PAGE);
      }
      if (!isJsonFormat(body)) {
        logger.error('---handleAWSCognitoAuth -> INVALID Body---', body);
        console.log(
          'authCognito.js handleAWSCognitoAuth redirect(ERROR_PAGE)333',
        );

        return res.redirect(ERROR_PAGE);
      }

      logger.log(
        '---handleAWSCognitoAuth -> statusCode:',
        response && response.statusCode,
      );
      logger.log('---handleAWSCognitoAuth -> body:', body);

      const { loginUrl, logoutUrl, authClientId } = JSON.parse(body);
      console.log('authCognito.js handleAWSCognitoAuth loginUrl=', loginUrl);
      const expires = new Date(Date.now() + 365 * ONE_DAY);
      const options = {
        secure: true,
        httpOnly: true,
        signed: false,
        expires,
      };

      if (isLogout) {
        return handleCognitoLogout(req, res, {
          logoutUrl,
          codeVerifier,
          authClientId,
          options,
        });
      }
      res.cookie('code_verifier', codeVerifier, options);
      res.cookie('authClientId', authClientId, options);

      /**
       *  重定向 到 SSO 登录页
       *
       *  https://cxarefdev.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?redirect_uri=https%3A%2F%2Flocalhost.com&scope=openid%20cxa%2Fprofile.ecommerce.read%20cxa%2Fprofile.write%20cxa%2FAll&response_type=CODE&code_challenge_method=S256&code_challenge=JvsnwJ6fscLuwfzWLHJqxKVh3IUJ-9ZFGwaYXWm4w_g&client_id=mv4614gkunlqfeiv3ciqj61pg&state=%2F
       */
      console.log(
        'authCognito.js handleAWSCognitoAuth redirect url=',
        `${isLogout ? logoutUrl : loginUrl}&state=${state}`,
      );

      return res.redirect(`${isLogout ? logoutUrl : loginUrl}&state=${state}`);
    },
  );
};

const handleLogin = (req, res) => {
  console.log('authCognito.js handleLogin ');
  if (req.cookies.id_token) {
    console.log("authCognito.js handleLogin redirect('/')");

    return res.redirect('/');
  }
  return handleAWSCognitoAuth(req, res);
};

const handleLogout = (req, res) => {
  return handleAWSCognitoAuth(req, res, true);
};

const refreshToken = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const refreshTokenCookie = getCookie(req.headers.cookie, 'refresh_token');
  const authClientId = getCookie(req.headers.cookie, 'authClientId');
  const payload = {
    grant_type: 'refresh_token',
    client_id: authClientId,
    refresh_token: refreshTokenCookie,
  };
  const options = {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: AWS_COGNITO_EXCHANGE_TOKEN_URL,
    form: payload,
  };
  logger.log('---Refresh Cognito Token -> START---', options);
  return request.post(options, (error, response, body) => {
    const curl = response.request.req.toCurl();
    if (error) {
      logger.error('---Refresh Cognito Token -> ERROR---', {
        url: AWS_COGNITO_EXCHANGE_TOKEN_URL,
        error,
        payload,
        curl,
      });
      return res.redirect(ERROR_PAGE);
    }
    if (!isJsonFormat(body)) {
      logger.error('---Refresh Cognito Token -> INVALID Body---', {
        body,
        payload,
        curl,
      });
      return res.redirect(ERROR_PAGE);
    }

    const data = extractTokens(body);
    if (data.error) {
      logger.error('---Refresh Cognito Token -> Body ERROR---', {
        error: data.error,
        payload,
        curl,
      });
      clearCookies(res);
      return res.end(JSON.stringify({ isSuccess: false }));
    }

    logger.log('---Refresh Cognito Token -> SUCCESS---', { data, curl });
    updateCookies(res, {
      ...data,
      userId: null,
      expires: getExpires(data.accessToken),
      idTokenExpires: getExpires(data.idToken),
    });
    return res.end(JSON.stringify({ isSuccess: true }));
  });
};

module.exports = server => {
  // middleware https://www.expressjs.com.cn/guide/writing-middleware.html
  server.get('/', setToken);
  server.get('/login', handleLogin);
  server.get('/renew-token', renewToken);
  server.get('/logout', handleLogout);
  server.get('/zuul-service/auth/token', refreshToken);
  return server;
};
