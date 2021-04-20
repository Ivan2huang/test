/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import isNumber from 'lodash/isNumber';
import logger from '../../helpers/logger';

import {
  ACCESS_TOKEN,
  USER_ID,
  CLIENT_ID,
  LOGGED_IN,
  routesWithoutFetchData,
  CUSTOMTOKEN_HEADER,
} from '../../constants/auth';

import { SERVICE_IDENTIFIERS } from '../../constants/api';
import { disableWallets, updateWallets } from '../benefits/wallets/action';
import {
  updateOutpatientStatus,
  updateWellnessStatus,
  updateEHealthCardStatus,
} from '../benefits/action';
import { HASE, GMM } from '../../constants/clinicProvider';

const dev = process.env.NODE_ENV === 'development';
const checkWallet = (accessToken, customToken, memberId, clientId) => {
  const url = `${
    process.env.E_WALLET_SERVICE
  }${SERVICE_IDENTIFIERS.eWalletService.replace(
    '/e-wallet-service/',
    '',
  )}/${clientId}/members/${memberId}/balance?includeDependents=${false}`;
  const authorizationHeader = {
    Authorization: `Bearer ${accessToken}`,
  };
  if (!dev) {
    authorizationHeader[CUSTOMTOKEN_HEADER] = customToken;
  }
  const options = {
    method: 'GET',
    headers: authorizationHeader,
  };

  console.log('withPrerequisiteData.jsx checkWallet url=', url);
  return axios(url, options)
    .then(response => {
      const { data } = response;
      const { member = {}, dependents = [] } = data;
      const hasValidData = [member, ...dependents].every(wallet =>
        isNumber(wallet.balance),
      );
      console.log(
        'withPrerequisiteData.jsx checkWallet hasValidData=',
        hasValidData,
      ); // true
      /**
       * data:{
          dependents: [],
          clientId: 'cxaref-dev',
          member: {
            memberId: '147',
            relationship: 'Self',
            balance: 50000,
            openBalance: 50000,
            currency: 'SGD'
          },
          validFrom: '2021-01-09T00:00:00',
          validTo: '2021-12-31T00:00:00'
        }
       */
      console.log('withPrerequisiteData.jsx checkWallet data=', data);

      return {
        hasValidData,
        data,
      };
    })
    .catch(error => {
      logger.error('---checkWallet -> ERROR', error);
      return {
        hasValidData: false,
      };
    });
};

const checkClientBenefitStatus = (accessToken, customToken, clientId) => {
  let status = {
    hasWellness: false,
    hasOutpatient: false,
    hasEHealthCard: false,
    isClientUsingHase: false,
    isClientGMM: false,
  };

  const configs = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      [CUSTOMTOKEN_HEADER]: customToken,
    },
  };

  const clientBenefits = `${process.env.BENEFIT_SERVICE}api/v1/clients/${clientId}/benefits`;

  // 请求诊所数据
  const clientClinicProviderUrl = `${process.env.ETPA_SERVICE}api/v2/clients/${clientId}/selected-clinicproviders`;
  const requests = [];
  console.log(
    'withPrerequisiteData.jsx checkClientBenefitStatus clientBenefits=',
    clientBenefits,
  );
  console.log(
    'withPrerequisiteData.jsx checkClientBenefitStatus configs=',
    configs,
  );
  requests.push(
    axios
      .get(clientBenefits, configs)
      .catch(error =>
        logger.error(
          `---checkClientBenefitStatus -> clientBenefits -> ERROR---`,
          error,
        ),
      ),
  );

  if (process.env.ENABLE_ETPA_SERVICE) {
    requests.push(
      axios
        .get(clientClinicProviderUrl, configs)
        .catch(error =>
          logger.error(
            `---checkClientBenefitStatus -> clientClinicProviderUrl -> ERROR---`,
            error,
          ),
        ),
    );
  }

  return Promise.all(requests)
    .then(([clientBenefitsResponse, clientClinicProviderResponse]) => {
      console.log(
        'withPrerequisiteData.jsx Promise.all clientBenefitsResponse=',
        clientBenefitsResponse,
      );
      if (clientBenefitsResponse && clientBenefitsResponse.data) {
        const {
          data: {
            hasWellness,
            hasOutpatient,
            hasEHealthCard,
            eHealthCardDetails,
            cardTypeDetails,
          },
        } = clientBenefitsResponse;
        status = {
          ...status,
          eHealthCardDetails: eHealthCardDetails || {},
          cardTypeDetails: cardTypeDetails || {},
          hasWellness: !!hasWellness,
          hasOutpatient: !!hasOutpatient,
          hasEHealthCard: !!hasEHealthCard,
        };
      }

      console.log(
        'withPrerequisiteData.jsx Promise.all clientClinicProviderResponse=',
        clientClinicProviderResponse,
      );

      if (clientClinicProviderResponse && clientClinicProviderResponse.data) {
        const { data: clientProviders } = clientClinicProviderResponse;
        if (Array.isArray(clientProviders) && clientProviders.length) {
          const isHase =
            clientProviders.findIndex(c => c.clinicProviderCode === HASE) > -1;
          const isClientGMM =
            clientProviders.findIndex(c => c.clinicProviderCode === GMM) > -1;
          status = {
            ...status,
            isClientUsingHase: isHase,
            isClientGMM,
          };
        }
      }

      if (clientBenefitsResponse instanceof Error) {
        logger.error(
          '---checkClientBenefitStatus -> clientBenefitsResponse -> ERROR---',
          clientBenefitsResponse,
        );
      }

      if (clientClinicProviderResponse instanceof Error) {
        logger.error(
          '---checkClientBenefitStatus -> clientClinicProviderResponse -> ERROR---',
          clientBenefitsResponse,
        );
      }

      console.log('withPrerequisiteData.jsx Promise.all status=', status);

      return status;
    })
    .catch(error => {
      logger.error('---checkClientBenefitStatus -> UNEXPECTED ERROR', error);
      return status;
    });
};

const getFromCookieOrLocals = ctx => {
  if (ctx && ctx.req) {
    const accessToken =
      ctx.req.cookies[ACCESS_TOKEN] || ctx.res.locals.accessToken;
    const userId = ctx.req.cookies[USER_ID] || ctx.res.locals.userId;
    const isLoggedIn = ctx.req.cookies[LOGGED_IN] || ctx.res.locals.isLoggedIn;
    const preferredLocale = ctx.req.cookies.lang || ctx.res.locals.lang;
    const clientId =
      ctx.req.cookies[CLIENT_ID] ||
      ctx.res.locals.clientId;
    return { isLoggedIn, userId, accessToken, preferredLocale, clientId };
  }
  return {};
};

const withPrerequisiteData = WrappedComponent =>
  class extends Component {
    static async getInitialProps({ ctx, ...rest }) {
      console.log('withPrerequisiteData.jsx getInitialProps');

      const {
        isLoggedIn,
        userId,
        accessToken,
        clientId,
      } = getFromCookieOrLocals(ctx);
      console.log('withPrerequisiteData.jsx isLoggedIn=', isLoggedIn);
      console.log('withPrerequisiteData.jsx userId=', userId);
      console.log('withPrerequisiteData.jsx accessToken=', accessToken);
      console.log('withPrerequisiteData.jsx clientId=', clientId);

      const shouldCallPrerequisiteData =
        isLoggedIn &&
        userId &&
        accessToken &&
        routesWithoutFetchData.indexOf(ctx.req.path) === -1;
      console.log(
        'withPrerequisiteData.jsx shouldCallPrerequisiteData=',
        shouldCallPrerequisiteData,
      );

      if (shouldCallPrerequisiteData) {
        logger.log('---request url ---', ctx.req.url);
        console.log('withPrerequisiteData.jsx request url=', ctx.req.url);
        const customToken = ctx.req.headers[CUSTOMTOKEN_HEADER] || '';
        // Check wallet data
        const { hasValidData, data } = await checkWallet(
          accessToken,
          customToken,
          userId,
          clientId,
        );

        if (hasValidData) {
          ctx.store.dispatch(updateWallets(data, {}));
        } else {
          ctx.store.dispatch(disableWallets());
        }

        logger.log('---Before calling checkClientBenefitStatus---');

        // Check benefit status
        const {
          hasWellness,
          hasOutpatient,
          hasEHealthCard,
          eHealthCardDetails,
          cardTypeDetails,
          isClientUsingHase,
          isClientGMM,
        } = await checkClientBenefitStatus(accessToken, customToken, clientId);

        logger.log('---After calling checkClientBenefitStatus---');
        console.log(
          'withPrerequisiteData.jsx checkClientBenefitStatus hasWellness=',
          hasWellness,
        );
        console.log(
          'withPrerequisiteData.jsx checkClientBenefitStatus hasOutpatient=',
          hasOutpatient,
        );
        ctx.store.dispatch(updateWellnessStatus(hasWellness));
        ctx.store.dispatch(updateOutpatientStatus(hasOutpatient));
        ctx.store.dispatch(
          updateEHealthCardStatus(
            hasEHealthCard,
            eHealthCardDetails,
            isClientUsingHase,
            cardTypeDetails,
            isClientGMM,
          ),
        );
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps({ ctx, ...rest }));
      console.log('withPrerequisiteData.jsx componentProps=', componentProps);

      return {
        ...componentProps,
      };
    }

    render() {
      console.log('withPrerequisiteData.jsx render');

      return <WrappedComponent {...this.props} />;
    }
  };

export default withPrerequisiteData;
