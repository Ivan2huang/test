import React from 'react';
import * as CNSTS from './constant';
import {
  HealthCardIcon,
  ActiveHealthCardIcon,
  SearchIcon,
  ActiveSearchIcon,
} from '../../icons';

const DOCTORLIST = ({ isTerminated, hasEHealthCard }) => {
  return [
    {
      activeIcon: <ActiveSearchIcon />,
      icon: <SearchIcon />,
      name: CNSTS.FIND_DOCTOR_NAME,
      id: CNSTS.FIND_DOCTOR_ID,
    },
    !isTerminated &&
      hasEHealthCard && {
        activeIcon: <ActiveHealthCardIcon />,
        icon: <HealthCardIcon />,
        name: CNSTS.HEALTHCARDS_NAME,
        id: CNSTS.HEALTHCARDS_ID,
      },
  ].filter(Boolean);
};

export default DOCTORLIST;
