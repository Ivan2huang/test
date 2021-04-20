import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import BENEFIT_LIST from './benefitsList';
import SideBar from '../../layouts/SideBar';
import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import { navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import { TERMINATED } from './constant';

const handleChange = tabKey => navigateTo(paths.common[tabKey]);

const Benefits = ({
  active,
  isLoaded,
  children,
  memberProfile,
  isWalletsDisabled,
  hasEHealthCard,
}) => {
  const isTerminated = memberProfile.status === TERMINATED;

  return (
    <Box mt={{ md: 8 }}>
      <Grid>
        <GridItem columns={{ xs: 12, sm: 12, md: 3 }}>
          {isLoaded && (
            <SideBar
              labelPrefix="benefits.tabs.label."
              active={active}
              items={BENEFIT_LIST({
                isTerminated,
                isWalletsDisabled,
                hasEHealthCard,
              })}
              handleChange={handleChange}
            />
          )}
        </GridItem>
        <GridItem columns={{ xs: 12, sm: 12, md: 8 }}>
          <Box pt={{ xs: 6, sm: 3, md: 2 }}>{children}</Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

Benefits.propTypes = {
  active: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLoaded: PropTypes.bool,
  memberProfile: PropTypes.shape().isRequired,
  isWalletsDisabled: PropTypes.bool,
  hasEHealthCard: PropTypes.bool,
};

Benefits.defaultProps = {
  isLoaded: false,
  isWalletsDisabled: false,
  hasEHealthCard: false,
};

export default Benefits;
