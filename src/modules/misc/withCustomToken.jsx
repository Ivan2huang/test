/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import {
  ACCESS_TOKEN,
  LOGGED_IN,
  CUSTOMTOKEN_HEADER,
} from '../../constants/auth';

import paths from '../../helpers/paths';
import logger from '../../helpers/logger';

const setCustomToken = async ctx => {
  const dev = process.env.NODE_ENV === 'development';
  const USE_AWS_COGNITO = process.env.FEATURE_TOGGLE_AWS_COGNITO === 'true';

  if (ctx && ctx.req) {
    const accessToken =
      ctx.req.cookies[ACCESS_TOKEN] || ctx.res.locals.accessToken;
    const isLoggedIn = ctx.req.cookies[LOGGED_IN] || ctx.res.locals.isLoggedIn;

    if (
      !dev &&
      USE_AWS_COGNITO &&
      isLoggedIn &&
      accessToken &&
      !ctx.req.headers[CUSTOMTOKEN_HEADER]
    ) {
      logger.log('---setCustomToken -> START---');
      const verifyTokenUrl = `${process.env.COGNITO_SERVICE}api/v1/OAuth/token/verify`;

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const result = await axios(verifyTokenUrl, options)
        .then(response => response)
        .catch(error => {
          logger.error('---setCustomToken -> ERROR---', error);
          if (ctx.req.path !== paths.common.error) {
            ctx.res.redirect(
              `${paths.common.login}?path=${encodeURIComponent(
                ctx.req.originalUrl,
              )}`,
            );
          }
        });
      if (result) {
        const customToken = result.headers[CUSTOMTOKEN_HEADER];
        ctx.req.headers[CUSTOMTOKEN_HEADER] = customToken;
        logger.log('---setCustomToken -> END---');
      } else {
        logger.error('---setCustomToken -> NO RESULT -> REDIRECT TO LOGIN---');
        ctx.res.redirect(
          `${paths.common.login}?path=${encodeURIComponent(
            ctx.req.originalUrl,
          )}`,
        );
      }
    }
  }
};

const withCustomToken = WrappedComponent =>
  class extends Component {
    static async getInitialProps({ ctx, ...rest }) {
      console.log('withCustomToken getInitialProps');
      await setCustomToken(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps({ ctx, ...rest }));

      return {
        ...componentProps,
      };
    }

    render() {
      console.log('withCustomToken render');

      return <WrappedComponent {...this.props} />;
    }
  };

export default withCustomToken;
