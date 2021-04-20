import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CONFIG from '../constants/config';
import defaultTheme from './theme';
import cendolTheme from './cendol/theme.cendol';
import basilTheme from './basil/theme.basil';
import gingerTheme from './ginger/theme.ginger';
import coreTheme from './core/theme.core';

const themes = {
  cendol: cendolTheme,
  balboa: defaultTheme,
  basil: basilTheme,
  ginger: gingerTheme,
  core: coreTheme,
};

const getTheme = () => {
  return themes[CONFIG.themeCode] || defaultTheme;
};

const withTheme = WrappedComponent =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      console.log('withThemeProvider.jsx getInitialProps');
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    render() {
      console.log('withThemeProvider.jsx render');

      return (
        <MuiThemeProvider theme={getTheme()}>
          <WrappedComponent {...this.props} />
        </MuiThemeProvider>
      );
    }
  };

export default withTheme;
