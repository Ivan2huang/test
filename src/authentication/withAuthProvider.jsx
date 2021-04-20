import React, { Component } from 'react';
import Router from 'next/router';

import { LOGGED_IN } from '../constants/auth';
import paths from '../helpers/paths';
import { hasCookie } from '../helpers/auth';
import { IsDependent } from '../helpers/roles';

const redirectIfNotAuthenticated = ctx => {
  if (ctx.req) {
    if (!ctx.req.cookies[LOGGED_IN] && !ctx.res.locals.accessToken) {
      console.log(
        'withAuthProvider.jsx redirectIfNotAuthenticated redirect url= ',
        `${paths.common.login}?path=${encodeURIComponent(ctx.req.originalUrl)}`,
      );
      ctx.res.redirect(
        `${paths.common.login}?path=${encodeURIComponent(ctx.req.originalUrl)}`,
      );
      return true;
    }
  } else if (!hasCookie(LOGGED_IN)) {
    console.log('withAuthProvider.jsx push login');
    Router.push(paths.common.login);
    return true;
  }

  return false;
};

const redirectIfTermsNotAccepted = ctx => {
  const isServer = ctx && ctx.req;

  const {
    me: {
      member: {
        profile: { isTermsAccepted, memberId },
      },
    },
  } = ctx.store.getState();

  if (memberId && !isTermsAccepted) {
    if (isServer) {
      ctx.res.redirect(paths.common.terms);
    } else {
      Router.push(paths.common.terms);
    }
    return true;
  }

  return false;
};

const redirectIfRestrictedByRole = ctx => {
  // console.log('withAuthProvider.jsx redirectIfRestrictedByRole ctx=', ctx);
  if (!ctx || !ctx.req) {
    return false;
  }

  const { path } = ctx.req;
  console.log('withAuthProvider.jsx redirectIfRestrictedByRole path=', path);

  if (
    path === '/' ||
    path.includes(paths.common.claimDetails) ||
    Object.values(paths.common).includes(path)
  ) {
    console.log('withAuthProvider.jsx redirectIfRestrictedByRole return false');

    return false;
  }

  const {
    me: {
      member: {
        profile: { role },
      },
    },
  } = ctx.store.getState();

  const validPathRoute = IsDependent(role)
    ? Object.values(paths.dependent).includes(path)
    : Object.values(paths.employee).includes(path);

  console.log(
    'withAuthProvider.jsx redirectIfRestrictedByRole validPathRoute=',
    validPathRoute,
  );
  if (!validPathRoute) {
    ctx.res.redirect(paths.common.unauthorized);
    return true;
  }

  return false;
};

const handleNavigation = ctx => {
  // console.log('withAuthProvider.jsx handleNavigation ctx =>', ctx);
  const redirectedToLogin = redirectIfNotAuthenticated(ctx);
  console.log(
    'withAuthProvider.jsx handleNavigation redirectedToLogin =>',
    redirectedToLogin,
  );

  let redirectedToTerms = false;
  if (!redirectedToLogin) {
    redirectedToTerms = redirectIfTermsNotAccepted(ctx);
  }
  console.log(
    'withAuthProvider.jsx handleNavigation redirectedToTerms =>',
    redirectedToTerms,
  );
  if (!redirectedToTerms) {
    redirectIfRestrictedByRole(ctx);
  }
};

const withAuth = WrappedComponent =>
  class extends Component {
    static async getInitialProps(ctx) {
      handleNavigation(ctx);
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuth;
