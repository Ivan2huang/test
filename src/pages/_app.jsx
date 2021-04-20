import React, { useEffect } from 'react';
import { compose } from 'redux';
import NextApp, { Container } from 'next/app';
import Head from 'next/head';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import withRedux from '../redux/withReduxProvider';
import withTheme from '../themes/withThemeProvider';
import withIntl from '../i18n/withIntlProvider';
import { formatMessage, navigateTo } from '../helpers/helpers';
import paths from '../helpers/paths';
import CONFIG from '../constants/config';
import withMemberProfile from '../modules/me/withMemberProfile';
import TITLES from '../constants/titles';
import { initFirebase, trackUserInfo } from '../helpers/firebase';
import withPendingActions from '../authentication/withPendingActions';
import withPrerequisiteData from '../modules/misc/withPrerequisiteData';
import withCustomToken from '../modules/misc/withCustomToken';
import logger from '../helpers/logger';

const App = injectIntl(({ Component, ...PageProps }) => {
  const {
    router: { route },
    intl,
  } = PageProps;
  const title = TITLES[route];

  useEffect(() => {
    const mousedown = () => {
      document.body.classList.add('using-mouse');
    };
    const keydown = event => {
      if (event.keyCode === 9) {
        document.body.classList.remove('using-mouse');
      }
    };

    document.body.addEventListener('mousedown', mousedown);
    document.body.addEventListener('keydown', keydown);

    return () => {
      document.body.removeEventListener('mousedown', mousedown);
      document.body.removeEventListener('keydown', keydown);
    };
  }, []);

  return (
    <>
      <Head>
        {title && (
          <title>{formatMessage(intl, title.id, title.defaultMessage)}</title>
        )}
      </Head>
      <Container>
        <Component {...PageProps} />
      </Container>
    </>
  );
});

App.getInitialProps = async ctx => {
  const componentProps =
    ctx.Component.getInitialProps && (await ctx.Component.getInitialProps(ctx));

  return { ...componentProps };
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  PageProps: PropTypes.shape({}),
};

App.defaultProps = {
  PageProps: {},
};

const withNextApp = WrappedComponent =>
  class WithProvider extends NextApp {
    static async getInitialProps(ctx) {
      console.log('_app.jsx withNextApp getInitialProps');
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    componentDidMount() {
      // make sure the DOM are ready for init firebase
      if (CONFIG.enableGA || CONFIG.enableFeatureToggle) {
        initFirebase();
      }
      if (CONFIG.enableGA) {
        if (this.props.initialProps && this.props.initialProps.memberProfile) {
          const {
            clientId,
            memberId,
            role,
          } = this.props.initialProps.memberProfile;

          trackUserInfo({ clientId, memberId, role });
        }
      }
    }

    componentDidCatch(error, errorInfo) {
      logger.log('--- App Crash Info ---', errorInfo);
      logger.error('--- App Crash ---', error);
      navigateTo(paths.common.error);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

/**
 * compose : 把 var a = fn1(fn2(fn3(fn4(x)))) 这种嵌套的调用方式改成 var a = compose(fn1,fn2,fn3,fn4)(x) 的方式调用。
 */
export default compose(
  withNextApp,
  withRedux,
  withCustomToken,
  withPendingActions,
  withPrerequisiteData,
  withMemberProfile,
  withTheme,
  withIntl,
)(App);
