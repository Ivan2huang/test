import React from 'react';
import PropTypes from 'prop-types';

import { Card, Box, Button, withStyles } from '@material-ui/core';
import Typography from '../../../uiComponents/Typography';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import PersonInfoField from './PersonInfoField';
import { navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';

const Styles = theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      background: 'none',
      boxShadow: 'unset',
      borderBottom: `1px solid ${theme.grey1}`,
    },
  },
  info: {
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.grey1}`,
    },
  },
});

const PersonInfo = ({
  classes,
  fields,
  showInviteBtn,
  memberId,
  buttonLabel,
  isDisabled,
  invalidMessage,
}) => {
  return (
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

            {showInviteBtn && (
              <GridItem columns={{ xs: 12, sm: 12, md: 12 }}>
                <Box pt={{ xs: 6, md: 6 }} pb={{ xs: 8, md: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      navigateTo(paths.employee.inviteDependent, {
                        memberId,
                      })
                    }
                    disabled={isDisabled}
                  >
                    {buttonLabel}
                  </Button>
                  {isDisabled && (
                    <Box pt={{ xs: 6, md: 3 }}>
                      <Typography type="style-8">{invalidMessage}</Typography>
                    </Box>
                  )}
                </Box>
              </GridItem>
            )}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

PersonInfo.propTypes = {
  classes: PropTypes.exact({
    container: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  buttonLabel: PropTypes.string,
  invalidMessage: PropTypes.string,
  showInviteBtn: PropTypes.bool,
  isDisabled: PropTypes.bool,
  memberId: PropTypes.string,
};

PersonInfo.defaultProps = {
  memberId: '',
  invalidMessage: '',
  fields: [],
  buttonLabel: '',
  showInviteBtn: false,
  isDisabled: false,
};

export default withStyles(Styles)(PersonInfo);
