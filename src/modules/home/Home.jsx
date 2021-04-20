import React, { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import paths from '../../helpers/paths';
import { getCookie } from '../../helpers/auth';
import { CLIENT_ID, USER_ID, LANG } from '../../constants/auth';
import logger from '../../helpers/logger';
import { SERVICE_IDENTIFIERS } from '../../constants/api';

const Home = () => {
  useEffect(() => {
    console.log('Home.jsx useEffect ');

    const clientId = getCookie(CLIENT_ID);
    const userId = getCookie(USER_ID);
    const lang = getCookie(LANG);
    console.log('Home.jsx useEffect clientId=', clientId);
    console.log('Home.jsx useEffect userId=', userId);

    if (clientId && userId) {
      const updateProfileUrl = `${SERVICE_IDENTIFIERS.memberService}/${clientId}/users/${userId}/profile`;

      const options = {
        method: 'PUT',
        headers: {
          accept: 'application/json;charset=UTF-8',
          'Content-Type': 'application/json;charset=UTF-8',
          'Accept-Language': lang,
          Pragma: 'no-cache',
        },
        data: {
          clientId,
          memberId: userId,
          updateLogin: true,
        },
      };
      if (lang) {
        options.data.preferredLocale = lang;
      }

      axios(updateProfileUrl, options)
        .then(response => response)
        .catch(error => {
          logger.error('---update last login -> ERROR---', error);
        });
    }
  }, []);

  useEffect(() => {
    console.log('Home.jsx useEffect clientid=', getCookie(CLIENT_ID));
    Router.push(`${paths.common.lifestyle}?clientid=${getCookie(CLIENT_ID)}`);
  }, []);

  console.log('Home.jsx render');
  return <div />;
};

export default Home;
