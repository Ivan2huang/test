const request = require('request');
const jwtDecode = require('jwt-decode');
const logger = require('./src/helpers/logger');

const ONE_DAY = 24 * 60 * 60 * 1000;
const {
  AUTH0_AUTHORIZE_URL,
  AUTH0_LOGOUT_URL,
  AUTH0_SSO_CLIENT_ID,
  AUTH0_REDIRECT_URL,
  AUTH0_AUDIENCE,
  AUTH0_SSO_CLIENT_SECRET,
  AUTH0_OAUTH_TOKEN_URL,
  AUTH0_CLIENT_ID,
  AUTH0_PENDING_ACTION,
  CLIENT_ID,
  NODE_ENV,
  DEFAULT_LANGUAGE,
  FEATURE_TOGGLE_C2_5798_ENABLE_REFRESH_TOKEN,
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
const AUTH0_PARAMS = {
  client_id: AUTH0_SSO_CLIENT_ID,
  redirect_uri: AUTH0_REDIRECT_URL,
  audience: AUTH0_AUDIENCE,
  returnTo: AUTH0_REDIRECT_URL,
  post_logout_redirect_uri: AUTH0_REDIRECT_URL,
  lang: DEFAULT_LANGUAGE,
};
const ERROR_PAGE = '/error';

const getCookie = (cookies, name) => {
  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);
  return parts
    .pop()
    .split(';')
    .shift();
};

const getAuthToken = code => ({
  grant_type: 'authorization_code',
  client_id: AUTH0_SSO_CLIENT_ID,
  client_secret: AUTH0_SSO_CLIENT_SECRET,
  redirect_uri: AUTH0_REDIRECT_URL,
  code,
});

const extractTokens = body => {
  const {
    access_token: accessToken,
    id_token: idToken,
    refresh_token: refreshToken,
  } = JSON.parse(body);
  const jwtData = jwtDecode(idToken);
  const accessTokenData = jwtDecode(accessToken);
  const userId =
    jwtData.sub.indexOf('|') > 0 ? jwtData.sub.split('|')[1] : jwtData.sub;
  const lang = jwtData.lang || DEFAULT_LANGUAGE;
  const clientId = accessTokenData[AUTH0_CLIENT_ID] || CLIENT_ID;
  const pendingActions = accessTokenData[AUTH0_PENDING_ACTION] || '';

  return {
    userId,
    clientId,
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
  const defaultExpires =
    FEATURE_TOGGLE_C2_5798_ENABLE_REFRESH_TOKEN === 'true'
      ? neverExpiryTime
      : expires;
  const secureCookieOptions = {
    expires: defaultExpires,
    secure: IS_NOT_DEV,
    httpOnly: true,
    signed: false,
  };
  const defaultCookieOptions = {
    expires: defaultExpires,
    secure: IS_NOT_DEV,
    httpOnly: false,
    signed: false,
  };

  res.clearCookie('state');

  res.cookie('access_token', accessToken, { ...secureCookieOptions, expires });
  res.cookie('refresh_token', refreshToken, secureCookieOptions);
  res.cookie('id_token', idToken, {
    ...secureCookieOptions,
    expires: idTokenExpires,
  });
  res.cookie('user_id', userId, defaultCookieOptions);
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

const setToken = (req, res, next) => {
  const { code, state } = req.query;
  if (!code) {
    return next();
  }

  return request.post(
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url: AUTH0_OAUTH_TOKEN_URL,
      form: getAuthToken(code),
    },
    (error, response, body) => {
      if (error) {
        logger.error('---Exchange Zuul Token -> ERROR---', error);
        return res.redirect(ERROR_PAGE);
      }
      if (!isJsonFormat(body)) {
        logger.error('---Exchange Zuul Token -> INVALID Body---', body);
        return res.redirect(ERROR_PAGE);
      }
      logger.log(
        '---Exchange Zuul Token -> statusCode:',
        response && response.statusCode,
      );
      logger.log('---Exchange Zuul Token -> body:', body);

      const data = extractTokens(body);
      updateCookies(res, {
        ...data,
        expires: getExpires(data.accessToken),
        idTokenExpires: getExpires(data.idToken),
      });

      if (decodeURIComponent(req.cookies.state) === state) {
        res.redirect(state);
      }
      return next();
    },
  );
};

const clearCookies = res => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.clearCookie('id_token');
  res.clearCookie('user_id');
  res.clearCookie('pending_actions');
  res.clearCookie('logged_in');
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
  const clientId =
    getCookie(req.headers.cookie, 'client_id') || res.locals.client_id;
  return clientId;
};

const handleZuulLogin = (req, res) => {
  const clientId = getClientId(req, res);
  if (!clientId) {
    return res.redirect(ERROR_PAGE);
  }

  const auth0Params = { ...AUTH0_PARAMS, connection: clientId };
  const state = `&state=${handleState(req, res)}`;

  const authorizationUrl = Object.keys(auth0Params).reduce(
    (acc, cur) => acc.replace(`{${cur}}`, auth0Params[cur]),
    AUTH0_AUTHORIZE_URL,
  );

  let lang = '';
  const langCookie = getCookie(req.headers.cookie, 'lang');
  if (langCookie) {
    lang = `&lang=${langCookie}`;
  }

  return res.redirect(`${authorizationUrl}${state}${lang}`);
};

const handleLogin = (req, res) => {
  if (req.cookies.id_token) {
    return res.redirect('/');
  }
  return handleZuulLogin(req, res);
};

const handleLogout = (req, res) => {
  const { id_token: idToken } = req.cookies;

  if (!idToken) {
    return res.redirect('/login');
  }

  const auth0Params = {
    ...AUTH0_PARAMS,
    ...{ id_token_hint: idToken },
  };

  clearCookies(res);

  const auth0LogoutUrl = Object.keys(auth0Params).reduce(
    (acc, cur) => acc.replace(`{${cur}}`, auth0Params[cur]),
    AUTH0_LOGOUT_URL,
  );

  return res.redirect(auth0LogoutUrl);
};

const refreshToken = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const refreshTokenCookie = getCookie(req.headers.cookie, 'refresh_token');
  return request.post(
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url: AUTH0_OAUTH_TOKEN_URL,
      form: {
        grant_type: 'refresh_token',
        client_id: AUTH0_SSO_CLIENT_ID,
        client_secret: AUTH0_SSO_CLIENT_SECRET,
        refresh_token: refreshTokenCookie,
      },
    },
    (error, response, body) => {
      if (error) {
        logger.error('---refreshToken -> ERROR---', error);
        return res.redirect(ERROR_PAGE);
      }

      if (isJsonFormat(body)) {
        const bodyData = JSON.parse(body);
        if ((bodyData.errors && bodyData.errors.length > 0) || bodyData.error) {
          logger.error('---refreshToken -> Body ERROR---', bodyData);
          clearCookies(res);
          return res.redirect(ERROR_PAGE);
        }
      } else {
        logger.error('---refreshToken -> INVALID Body---', body);
        return res.redirect(ERROR_PAGE);
      }
      logger.log(
        '---refreshToken -> statusCode:',
        response && response.statusCode,
      );
      logger.log('---refreshToken -> body:', body);
      const data = extractTokens(body);
      updateCookies(res, {
        ...data,
        expires: getExpires(data.accessToken),
        idTokenExpires: getExpires(data.idToken),
      });

      logger.log('---refreshToken -> Successfully refreshed Token---');
      return res.end(JSON.stringify({ isSuccess: true }));
    },
  );
};

module.exports = server => {
  server.get('/', setToken);
  server.get('/login', handleLogin);
  server.get('/renew-token', renewToken);
  server.get('/logout', handleLogout);
  server.get('/zuul-service/auth/token', refreshToken);
  return server;
};
