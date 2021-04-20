import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import qs from 'qs';
import {
  LOGGED_IN,
  PENDING_ACTIONS,
  USER_ID,
  CLIENT_ID,
  AUTH_CLIENT_ID,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
} from '../constants/auth';
import paths from '../helpers/paths';
import { storeUserEmail } from '../modules/login/account-activation/action';
import CONFIG from '../constants/config';
import logger from '../helpers/logger';

const PendingActions = {
  FIRST_LOGIN_OTP_VERIFY: 'FirstLoginOTPVerification',
};

const getClientCredentials = () => {
  const {
    AUTH0_SSO_CLIENT_ID,
    AUTH0_SSO_CLIENT_SECRET,
    AUTH0_OAUTH_TOKEN_URL,
  } = process.env;

  const url = AUTH0_OAUTH_TOKEN_URL;
  return axios
    .post(url, {
      grant_type: 'client_credentials',
      client_id: AUTH0_SSO_CLIENT_ID,
      client_secret: AUTH0_SSO_CLIENT_SECRET,
    })
    .then(response => {
      const { data } = response;
      return data.access_token;
    })
    .catch(error => {
      logger.error('---getClientCredentials -> ERROR---', error);
    });
};

const getUserInfo = (clientId, userId, accessToken) => {
  const url = `${process.env.ZUUL_SERVICE}/api/v2/clients/${clientId}/users/${userId}`;
  const authorizationHeader = {
    Authorization: `Bearer ${accessToken}`,
  };
  const options = {
    method: 'GET',
    headers: authorizationHeader,
  };
  return axios(url, options)
    .then(response => {
      const { data } = response;
      return data;
    })
    .catch(error => {
      logger.error('---getUserInfo -> ERROR---', error);
    });
};

const getFromCookieOrLocals = req => {
  const userId = req.cookies[USER_ID];
  const clientId = req.cookies[CLIENT_ID];
  const refreshToken = req.cookies[REFRESH_TOKEN];
  const accessToken = req.cookies[ACCESS_TOKEN];
  const authClientId = req.cookies[AUTH_CLIENT_ID];

  return { userId, clientId, authClientId, accessToken, refreshToken };
};

const getEmail = async req => {
  const { userId, clientId } = getFromCookieOrLocals(req);
  try {
    const accessToken = await getClientCredentials();
    const userInfo = await getUserInfo(clientId, userId, accessToken);
    if (
      process.env.THEME_CODE === 'balboa' &&
      userInfo.secondary_email_address
    ) {
      return userInfo.secondary_email_address;
    }
    return userInfo.email;
  } catch (err) {
    return '';
  }
};

const redirectIfPendingActions = async ctx => {
  const {
    root,
    login,
    error,
    accountAcivation,
    accountActivationError,
  } = paths.common;

  if (ctx && ctx.req) {
    if (ctx.req.originalUrl === error) {
      return;
    }

    const pendingActions = ctx.req.cookies[PENDING_ACTIONS] || '';
    const hasPendingActions =
      pendingActions.indexOf(PendingActions.FIRST_LOGIN_OTP_VERIFY) !== -1;
    const { originalUrl } = ctx.req;
    const pagesWithoutVerify = [accountAcivation, accountActivationError];

    if (originalUrl === accountAcivation && hasPendingActions) {
      const email = await getEmail(ctx.req);
      if (email) {
        ctx.store.dispatch(storeUserEmail(email));
      }
    }

    if (pagesWithoutVerify.indexOf(originalUrl) === -1) {
      if (hasPendingActions) {
        ctx.res.redirect(accountAcivation);
      }
    } else if (!ctx.req.cookies[LOGGED_IN] && !ctx.res.locals.accessToken) {
      ctx.res.redirect(login);
    } else if (!hasPendingActions) {
      ctx.res.redirect(root);
    }
  }
};

const getRefreshTokenPayload = ({ authClientId, currentRefreshToken }) => {
  if (process.env.FEATURE_TOGGLE_AWS_COGNITO === 'true') {
    return {
      contentType: 'application/x-www-form-urlencoded',
      url: process.env.AWS_COGNITO_EXCHANGE_TOKEN_URL,
      payload: qs.stringify({
        grant_type: 'refresh_token',
        client_id: authClientId,
        refresh_token: currentRefreshToken,
      }),
    };
  }

  return {
    contentType: 'application/json',
    url: process.env.AUTH0_OAUTH_TOKEN_URL,
    payload: {
      grant_type: 'refresh_token',
      client_id: process.env.AUTH0_SSO_CLIENT_ID,
      client_secret: process.env.AUTH0_SSO_CLIENT_SECRET,
      refresh_token: currentRefreshToken,
    },
  };
};

const refreshToken = ctx => {
  if (ctx && ctx.req && ctx.req.path !== paths.common.tokenExpired) {
    const {
      refreshToken: currentRefreshToken,
      accessToken,
      authClientId,
    } = getFromCookieOrLocals(ctx.req);
    if (!accessToken && currentRefreshToken) {
      const { url, payload, contentType } = getRefreshTokenPayload({
        authClientId,
        currentRefreshToken,
      });
      const options = {
        method: 'post',
        headers: {
          'content-type': contentType,
        },
        url,
        data: payload,
      };
      return axios(options)
        .then(res => {
          const {
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          } = res.data;
          logger.log('---server side refreshToken -> SUCCESS---', {
            data: res.data,
          });
          const expires = new Date(jwtDecode(newAccessToken).exp * 1000);
          const oneDay = 24 * 60 * 60 * 1000;
          const neverExpiryTime = new Date(Date.now() + 365 * oneDay);

          const secureCookieOptions = {
            expires: neverExpiryTime,
            secure: process.env.NODE_ENV !== 'development',
            httpOnly: true,
            signed: false,
          };
          ctx.res.cookie('access_token', newAccessToken, {
            ...secureCookieOptions,
            expires,
          });
          if (newRefreshToken) {
            ctx.res.cookie(
              'refresh_token',
              newRefreshToken,
              secureCookieOptions,
            );
          }
          ctx.res.locals.accessToken = newAccessToken;
        })
        .catch(error => {
          logger.error('---server side refreshToken -> ERROR---', {
            error,
            options,
          });
        });
    }
  }
  return null;
};

const withPendingActions = WrappedComponent =>
  class extends Component {
    static async getInitialProps({ ctx, ...rest }) {
      console.log('withPendingActions.jsx getInitialProps');
      if (CONFIG.enableRefreshToken) {
        await refreshToken(ctx);
      }
      if (!CONFIG.disablePendingAction) {
        await redirectIfPendingActions(ctx);
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps({ ctx, ...rest }));

      return { ...componentProps };
    }

    render() {
      console.log('withPendingActions.jsx render');

      return <WrappedComponent {...this.props} />;
    }
  };

export default withPendingActions;
