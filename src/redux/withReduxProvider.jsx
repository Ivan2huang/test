/* eslint-disable react/prop-types */

import React from 'react';
import withNextRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import withReduxSaga from 'next-redux-saga';
import configureStore from './store';

const withProvider = WrappedComponent =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      const { store } = this.props;
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };

const withRedux = compose(
  withNextRedux(configureStore),
  withReduxSaga,
  withProvider,
);

export default withRedux;
