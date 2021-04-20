import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import DOCTOR_LIST from './doctorList';
import SideBar from '../../layouts/SideBar';
import Grid from '../../uiComponents/Grid';
import GridItem from '../../uiComponents/GridItem';
import { navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import { TERMINATED } from '../benefits/constant';

const handleChange = tabKey => navigateTo(paths.common[tabKey]);

const Doctors = ({
  active,
  isLoaded,
  children,
  memberProfile,
  hasEHealthCard,
  fillRight,
}) => {
  const isTerminated = memberProfile.status === TERMINATED;

  return (
    <Box mt={{ md: 8 }}>
      <Grid>
        <GridItem columns={{ xs: 12, sm: 12, md: 3 }}>
          {isLoaded && (
            <SideBar
              labelPrefix="doctors.tabs.label."
              active={active}
              items={DOCTOR_LIST({ isTerminated, hasEHealthCard })}
              handleChange={handleChange}
            />
          )}
        </GridItem>
        <GridItem columns={{ xs: 12, sm: 12, md: fillRight ? 9 : 8 }}>
          <Box pt={{ xs: 6, sm: 3, md: 2 }}>{children}</Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

Doctors.propTypes = {
  active: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLoaded: PropTypes.bool,
  memberProfile: PropTypes.shape().isRequired,
  fillRight: PropTypes.bool,
  hasEHealthCard: PropTypes.bool,
};

Doctors.defaultProps = {
  isLoaded: false,
  hasEHealthCard: false,
  fillRight: false,
};

export default Doctors;
