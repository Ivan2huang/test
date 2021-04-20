/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { Box, withStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';

const Styles = theme => ({
  row: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: 'solid 1px',
      borderBottomColor: theme.grey1,
    },
  },
});

const Details = ({ header, details, classes }) => (
  <Box mt={{ xs: 6, md: 10 }}>
    <Typography type="style-3">{header}</Typography>
    <Box mt={{ md: 4 }}>
      {details.map(
        (detail, index) =>
          detail.value && (
            <Box key={detail.value} className={classes.row}>
              <Grid key={`${header}-${index}`}>
                <GridItem columns={{ xs: 12, sm: 12, md: 5 }}>
                  <Box mt={{ xs: 6, md: 0 }} mb={{ md: 2 }}>
                    <Typography type="style-6">{detail.label}</Typography>
                  </Box>
                </GridItem>
                <GridItem columns={{ xs: 12, sm: 12, md: 7 }}>
                  <Box mb={{ xs: 6, md: 2 }} mt={{ xs: 1, md: 0 }}>
                    <Typography type="style-5">{detail.value}</Typography>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          ),
      )}
    </Box>
  </Box>
);

Details.defaultProps = {
  header: '',
};

Details.propTypes = {
  classes: PropTypes.shape({
    row: PropTypes.string.isRequired,
  }).isRequired,
  header: PropTypes.string,
  details: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      value: PropTypes.any,
    }),
  ).isRequired,
};

export default withStyles(Styles)(Details);
