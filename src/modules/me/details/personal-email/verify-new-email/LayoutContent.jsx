import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Grid from '../../../../../uiComponents/Grid';
import GridItem from '../../../../../uiComponents/GridItem';
import Typography from '../../../../../uiComponents/Typography';

const styles = theme => ({
  backgroundImageContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(10),
      marginBottom: theme.spacingX(10),
    },
  },
  backgroundImage: {
    [theme.breakpoints.up('md')]: {
      minWidth: 400,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 208,
    },
  },
  mobileTextCenter: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
});

const LayoutContent = ({ classes, title, description, backgroundImage }) => {
  return (
    <Grid>
      <GridItem offset={{ md: 1 }} columns={{ sm: 12, xs: 12, md: 5 }}>
        <Box className={classes.backgroundImageContainer}>
          <img
            className={classes.backgroundImage}
            src={backgroundImage}
            alt=""
          />
        </Box>
      </GridItem>
      <GridItem columns={{ sm: 12, xs: 12, md: 5 }}>
        <Box mb={4} className={classes.mobileTextCenter}>
          <Typography type="style-1">{title}</Typography>
        </Box>
        <Grid>
          <GridItem columns={{ xs: 12, md: 10 }}>
            <Box className={classes.mobileTextCenter}>
              <Typography type="style-6">{description}</Typography>
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

LayoutContent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default withStyles(styles)(LayoutContent);
