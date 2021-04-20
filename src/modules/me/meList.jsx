import React from 'react';
import * as CNSTS from './constant';
import {
  MyDetailsIcon,
  ActiveMyDetailsIcon,
  SettingsIcon,
  ActiveSettingsIcon,
  ResetPasswordIcon,
  ActiveResetPasswordIcon,
  LogoutIcon,
  ActiveLogoutIcon,
} from '../../icons/me';

const ME_LIST = () => {
  return [
    {
      activeIcon: <ActiveMyDetailsIcon />,
      icon: <MyDetailsIcon />,
      name: CNSTS.DETAILS_NAME,
      id: CNSTS.DETAILS_ID,
    },
    {
      activeIcon: <ActiveResetPasswordIcon />,
      icon: <ResetPasswordIcon />,
      name: CNSTS.RESET_PASSWORD_NAME,
      id: CNSTS.RESET_PASSWORD_ID,
    },
    {
      activeIcon: <ActiveSettingsIcon />,
      icon: <SettingsIcon />,
      name: CNSTS.SETTINGS_NAME,
      id: CNSTS.SETTINGS_ID,
      suffix: CNSTS.MOBILE_SUFFIX,
    },
    {
      activeIcon: <ActiveLogoutIcon />,
      icon: <LogoutIcon />,
      name: CNSTS.LOGOUT_NAME,
      id: CNSTS.LOGOUT_ID,
    },
  ].filter(Boolean);
};

export default ME_LIST;
