import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import ME_LIST from './meList';
import SideBar from '../../layouts/SideBar';
import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import { navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import ResetPasswordResult from './settings/reset-password/ResultModal';
import { RESET_PASSWORD_ID } from './constant';

const Me = ({
  email,
  active,
  isLoaded,
  children,
  isMobileOnly,
  isRequestResetPasswordSuccess,
  resetPassword,
  updateResetPasswordResult,
}) => {
  const handleChange = tabKey => {
    if (tabKey === RESET_PASSWORD_ID) {
      resetPassword();
    } else {
      navigateTo(paths.common[tabKey]);
    }
  };

  const closeModal = () => {
    updateResetPasswordResult(false);
  };

  if (isMobileOnly) {
    return (
      <>
        {isLoaded && (
          <SideBar
            labelPrefix="me.tabs.label."
            active={active}
            items={ME_LIST()}
            handleChange={handleChange}
            isMobileOnly
          />
        )}
        {children}
      </>
    );
  }

  return (
    <Box mt={{ md: 8 }}>
      <Grid>
        <GridItem columns={{ xs: 12, sm: 12, md: 3 }}>
          {isLoaded && (
            <SideBar
              labelPrefix="me.tabs.label."
              active={active}
              items={ME_LIST()}
              handleChange={handleChange}
            />
          )}
        </GridItem>
        <GridItem columns={{ xs: 12, sm: 12, md: 8 }}>
          <Box pt={{ xs: 6, sm: 3, md: 2 }}>{children}</Box>
        </GridItem>
      </Grid>
      <ResetPasswordResult
        email={email}
        open={isRequestResetPasswordSuccess}
        handleClose={closeModal}
      />
    </Box>
  );
};

Me.propTypes = {
  email: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLoaded: PropTypes.bool,
  isMobileOnly: PropTypes.bool,
  isRequestResetPasswordSuccess: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
  updateResetPasswordResult: PropTypes.func.isRequired,
};

Me.defaultProps = {
  isLoaded: false,
  isMobileOnly: false,
};

export default Me;
