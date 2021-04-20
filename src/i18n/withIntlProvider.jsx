/* eslint-disable react/prop-types */
/* eslint-disable global-require */

import React, { createContext } from 'react';
import { IntlProvider } from 'react-intl';

import { messages } from './lang';
import CONFIG from '../constants/config';
import appContext from '../appContext';

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/en');
  require('@formatjs/intl-pluralrules/dist/locale-data/zh');
  require('@formatjs/intl-pluralrules/dist/locale-data/th');
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/zh');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/th');
}

export const IntlContext = createContext();

const withIntl = WrappedComponent =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      console.log('withIntlProvider.jsx getInitialProps ');
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps };
    }

    constructor(props) {
      super(props);
      console.log('withIntlProvider.jsx constructor ');

      const { preferredLocale } = props;
      this.state = {
        intlLocale: preferredLocale || CONFIG.defaultLanguage,
      };
      this.handleLocaleChange = this.handleLocaleChange.bind(this);
    }

    componentDidMount() {
      console.log('withIntlProvider.jsx componentDidMount ');

      const { intlLocale } = this.state;
      appContext().set('locale', intlLocale);
      document.querySelector('html').setAttribute('lang', intlLocale);
    }

    handleLocaleChange(locale) {
      this.setState({ intlLocale: locale });
      document.querySelector('html').setAttribute('lang', locale);
    }

    render() {
      console.log(
        'withIntlProvider.jsx render intlLocale=',
        this.state.intlLocale,
      );

      const { intlLocale } = this.state;
      return (
        <IntlContext.Provider value={this.handleLocaleChange}>
          <IntlProvider
            textComponent="span"
            locale={intlLocale}
            messages={messages[intlLocale]}
          >
            <WrappedComponent {...this.props} />
          </IntlProvider>
        </IntlContext.Provider>
      );
    }
  };

export default withIntl;
