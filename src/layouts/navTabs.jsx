import React from 'react';

import {
  ActiveClaimsIcon,
  ActiveLifestyleIcon,
  ActiveChoicesIcon,
  ActiveMyBenefitsIcon,
  ActiveDoctorsIcon,
  ClaimsIcon,
  LifestyleIcon,
  ChoicesIcon,
  MyBenefitsIcon,
  DoctorsIcon,
} from '../icons';
import { ActiveMeIcon, MeIcon } from '../icons/me';
import CONFIG from '../constants/config';
import { CLIENT_ID } from '../constants/auth';
import { getCookie } from '../helpers/auth';

const NAV_TABS = [
  {
    activeIcon: <ActiveLifestyleIcon />,
    icon: <LifestyleIcon />,
    name: 'lifestyle',
    displayName: 'Lifestyle',
    trackingName: 'Lifestyle',
    getParams: () => {
      return {
        clientId: getCookie(CLIENT_ID),
      };
    },
  },
  {
    activeIcon: <ActiveDoctorsIcon />,
    icon: <DoctorsIcon />,
    name: 'doctors',
    displayName: 'Doctors',
    trackingName: 'Doctors',
  },
  {
    activeIcon: <ActiveMyBenefitsIcon />,
    icon: <MyBenefitsIcon />,
    name: 'benefits',
    displayName: 'Benefits',
    trackingName: 'Benefits',
  },
  {
    activeIcon: <ActiveClaimsIcon />,
    icon: <ClaimsIcon />,
    name: 'claims',
    displayName: 'Claims',
    trackingName: 'Claims',
  },
  {
    activeIcon: <ActiveChoicesIcon />,
    icon: <ChoicesIcon />,
    name: 'eshop',
    displayName: 'Choices',
    externalUrl: CONFIG.shopUrl,
    trackingName: 'Choices',
    getParams: () => {
      return {
        clientId: getCookie(CLIENT_ID),
      };
    },
  },
  {
    activeIcon: <ActiveMeIcon />,
    icon: <MeIcon />,
    name: 'me',
    displayName: 'Me',
    trackingName: 'Profile',
  },
];

export default NAV_TABS;
