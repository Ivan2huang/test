/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import {
  ACCESS_TOKEN,
  USER_ID,
  LOGGED_IN,
  CLIENT_ID,
  routesWithoutFetchData,
  CUSTOMTOKEN_HEADER,
} from '../../constants/auth';
import { SERVICE_IDENTIFIERS } from '../../constants/api';

import { updateMemberProfile } from './action';
import { transformMemberDetails } from './api';
import logger from '../../helpers/logger';

const dev = process.env.NODE_ENV === 'development';

const getMemberProfile = (accessToken, memberId, clientId, ctx) => {
  logger.log('---getMemberProfile -> START---');

  const url = `${
    process.env.MEMBER_SERVICE
  }${SERVICE_IDENTIFIERS.memberService.replace(
    '/member-service/',
    '',
  )}/${clientId}/users/${memberId}/profile`;
  const authorizationHeader = {
    Authorization: `Bearer ${accessToken}`,
  };
  if (!dev) {
    authorizationHeader[CUSTOMTOKEN_HEADER] =
      ctx.req.headers[CUSTOMTOKEN_HEADER] || '';
  }
  const options = {
    method: 'GET',
    headers: authorizationHeader,
  };

  console.log('withMemberProfile.jsx getMemberProfile url=', url);
  console.log('withMemberProfile.jsx getMemberProfile options=', options);

  return axios(url, options)
    .then(response => {
      const { data } = response;
      logger.log('---getMemberProfile -> END---');
      /**
       * 用 huyduong@mailinator.com  和  P@ssw0rd  登录后可拿到 的 data :
       * {
            clientId: 'cxaref-dev',
            memberId: '147',
            fullName: 'Huy Duong',
            hasLoggedIn: true,
            firstName: 'Huy',
            lastName: 'Duong',
            workEmail: 'huyduong@mailinator.com',
            externalId: 'huyduong',
            gender: 'Male',
            dateOfBirth: '1990-09-10T00:00:00',
            lastLogin: '2021-03-19T10:59:14.813293',
            role: 'Employee',
            category: 'Tier 1A',
            relationshipToEmployee: 'Self',
            relationshipCategory: 'Self',
            preferredLocale: 'en-UK',
            currency: 'HKD',
            certificateNumber: 'huyduong',
            dependentNumber: '3',
            relationships: [],
            isEmailVerified: true,
            isTermsAccepted: true,
            isEdmOptedOut: true,
            isSelfRegisteredUser: false,
            status: 'None',
            accountStatus: 'Active',
            policyNumber: 'huyduong',
            preferedEmail: 'huyduong@mailinator.com',
            nationality: 'Hong Kong',
            identificationNumber: 'huyduong',
            identificationType: 'nana',
            membershipNumber: 'huyduong'
          }
       */
      console.log('withMemberProfile.jsx getMemberProfile data=', data);
      return data;
    })
    .catch(error => {
      logger.error('---getMemberProfile -> ERROR---', error);
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

const withMemberProfile = WrappedComponent =>
  class extends Component {
    static async getInitialProps({ ctx, ...rest }) {
      console.log('withMemberProfile.jsx getInitialProps');
      let memberProfile = {};
      const {
        isLoggedIn,
        userId,
        accessToken,
        preferredLocale,
        clientId,
      } = getFromCookieOrLocals(ctx);

      const shouldCallMemberProfile =
        isLoggedIn &&
        userId &&
        accessToken &&
        routesWithoutFetchData.indexOf(ctx.req.path) === -1;

      if (shouldCallMemberProfile) {
        memberProfile =
          (await getMemberProfile(accessToken, userId, clientId, ctx)) || {};
        ctx.store.dispatch(
          updateMemberProfile(transformMemberDetails(memberProfile)),
        );
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps({ ...ctx, ...rest }));

      return {
        memberProfile,
        ...componentProps,
        preferredLocale,
      };
    }

    render() {
      console.log('withMemberProfile.jsx render');

      return <WrappedComponent {...this.props} />;
    }
  };

export default withMemberProfile;
