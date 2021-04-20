import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, withStyles } from '@material-ui/core';

import GridItem from '../../../uiComponents/GridItem';
import Grid from '../../../uiComponents/Grid';
import Typography from '../../../uiComponents/Typography';
import { EditIcon, AddIcon } from '../../../icons';
import { formatMessage, navigateTo } from '../../../helpers/helpers';

const Styles = theme => ({
  editIcon: {
    fontSize: theme.spacing(3),
    transform: 'rotate(-90deg)',
    marginLeft: 4,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(6),
    },
  },
  labelAction: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  addIcon: {
    fontSize: theme.spacing(3),
    marginLeft: 4,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(6),
    },
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
  },
  rowActions: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
});

const PersonInfoField = ({
  classes,
  intl,
  title,
  description,
  editable,
  addable,
  url,
}) => {
  const navigateToActionPage = () => {
    if (!url) return false;
    return navigateTo(url);
  };

  const renderEditButton = () => {
    return (
      <button
        type="button"
        data-testid="btn-editAction"
        className={classes.actionsContainer}
        onClick={navigateToActionPage}
      >
        <Typography
          type="style-5"
          color="highEmphasis"
          className={classes.labelAction}
        >
          {formatMessage(intl, 'me.details.personalInfo.btn.edit', 'Edit')}
        </Typography>
        <EditIcon
          data-testid="edit-icon"
          classes={{ root: classes.editIcon }}
        />
      </button>
    );
  };

  const renderAddButton = () => {
    return (
      <button
        type="button"
        data-testid="btn-addAction"
        className={classes.actionsContainer}
        onClick={navigateToActionPage}
      >
        <Typography
          type="style-5"
          color="highEmphasis"
          className={classes.labelAction}
        >
          {formatMessage(intl, 'me.details.personalInfo.btn.add', 'Add')}
        </Typography>
        <AddIcon data-testid="add-icon" classes={{ root: classes.addIcon }} />
      </button>
    );
  };

  const renderRowActions = () => {
    return (
      <GridItem columns={{ xs: 4, sm: 4, md: 4 }}>
        <Box
          data-testid="box-Actions"
          pt={1}
          pb={{ xs: 6, md: 2 }}
          className={classes.rowActions}
        >
          {editable && renderEditButton()}
          {addable && renderAddButton()}
        </Box>
      </GridItem>
    );
  };

  const itemColumns = editable || addable ? 8 : 12;
  return (
    <>
      <GridItem columns={{ xs: 12, sm: 12, md: 4 }}>
        <Box pt={{ xs: 6, md: 1 }} pb={{ xs: 0, md: 1 }}>
          <Typography type="style-6">{title}</Typography>
        </Box>
      </GridItem>
      <GridItem columns={{ xs: 12, sm: 12, md: 8 }}>
        <Grid>
          <GridItem columns={{ xs: itemColumns, sm: itemColumns, md: 8 }}>
            <Box pt={1} pb={{ xs: 6, md: 1 }}>
              <Typography type="style-5" color="highEmphasis">
                {description}
              </Typography>
            </Box>
          </GridItem>
          {(editable || addable) && renderRowActions()}
        </Grid>
      </GridItem>
    </>
  );
};

PersonInfoField.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  addable: PropTypes.bool.isRequired,
  url: PropTypes.string,
};

PersonInfoField.defaultProps = {
  description: '',
  url: '',
};

export default withStyles(Styles)(injectIntl(PersonInfoField));
