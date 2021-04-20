import React from 'react';
import * as CNSTS from './constant';
import {
  MyBenefitsIcon,
  UsefulDocumentsIcon,
  ActiveMyBenefitsIcon,
  ActiveUsefulDocumentsIcon,
  ActiveWalletIcon,
  WalletIcon,
  HelpIcon,
  ActiveHelpIcon,
} from '../../icons/me';

import { HealthCardIcon, ActiveHealthCardIcon } from '../../icons';

const ME_LIST = ({
  isTerminated = false,
  isWalletsDisabled,
  hasEHealthCard,
}) => {
  return [
    !isTerminated &&
      hasEHealthCard && {
        activeIcon: <ActiveHealthCardIcon />,
        icon: <HealthCardIcon />,
        name: CNSTS.HEALTHCARDS_NAME,
        id: CNSTS.HEALTHCARDS_ID,
      },
    !isWalletsDisabled && {
      activeIcon: <ActiveWalletIcon />,
      icon: <WalletIcon />,
      name: CNSTS.E_WALLET_NAME,
      id: CNSTS.E_WALLET_ID,
    },
    {
      activeIcon: <ActiveMyBenefitsIcon />,
      icon: <MyBenefitsIcon />,
      name: CNSTS.BENEFITS_NAME,
      id: CNSTS.BENEFITS_ID,
    },
    {
      activeIcon: <ActiveUsefulDocumentsIcon />,
      icon: <UsefulDocumentsIcon />,
      name: CNSTS.DOCUMENTS_NAME,
      id: CNSTS.DOCUMENTS_ID,
    },
    {
      activeIcon: <ActiveHelpIcon />,
      icon: <HelpIcon />,
      name: CNSTS.FAQ_NAME,
      id: CNSTS.FAQ_ID,
    },
  ].filter(Boolean);
};

export default ME_LIST;
