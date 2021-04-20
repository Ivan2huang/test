import React from 'react';
import PropTypes from 'prop-types';

import { Card, Box, withStyles } from '@material-ui/core';

import Grid from '../../../uiComponents/Grid';
import PersonInfoField from './PersonInfoField';

const Styles = theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      background: 'none',
      boxShadow: 'unset',
    },
  },
  info: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.grey1}`,
    },
  },
});

const PersonInfoDependent = ({ classes, fields }) => (
  <Box mt={2}>
    <Card classes={{ root: classes.container }}>
      <Box my={{ xs: 0, md: 8 }} mx={{ xs: 0, md: 12 }}>
        <Grid>
          {fields.map(({ label, value, editable, addable, url }) => (
            <PersonInfoField
              key={label}
              title={label}
              description={value}
              editable={editable}
              addable={addable}
              url={url}
            />
          ))}
        </Grid>
      </Box>
    </Card>
  </Box>
);

PersonInfoDependent.propTypes = {
  classes: PropTypes.exact({
    container: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
};

PersonInfoDependent.defaultProps = {
  fields: [],
};

export default withStyles(Styles)(PersonInfoDependent);
