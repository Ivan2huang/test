/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { ModalCloseIcon } from '../icons';

const styles = theme => ({
  dialogPaperWidthSm: {
    maxWidth: 'inherit',
    margin: `${theme.spacingX(16)} ${theme.spacingX(6)}`,
    padding: `${theme.spacingX(6)}`,
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacingX(32)} ${theme.spacingX(6)}`,
      padding: `${theme.spacingX(6)} ${theme.spacingX(12)}`,
    },
  },
  dialogScrollPaper: {
    alignItems: 'flex-start',
  },
  dialogPaperScrollPaper: {
    maxHeight: `calc(100% - ${theme.spacingX(55)})`,
    [theme.breakpoints.down('sm')]: {
      maxHeight: `calc(100% - ${theme.spacingX(30)})`,
    },
  },
  dialogTitle: {
    padding: 0,
    paddingBottom: theme.spacingX(4),
  },
  dialogContent: {
    padding: 0,
  },
  dialogActions: {
    padding: 0,
    paddingTop: theme.spacingX(8),
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  iconButton: {
    padding: 0,
  },
});

const Modal = ({
  classes,
  children,
  open,
  handleClose,
  title,
  testId,
  actions,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{
        paperWidthSm: classes.dialogPaperWidthSm,
        scrollPaper: classes.dialogScrollPaper,
        paperScrollPaper: classes.dialogPaperScrollPaper,
      }}
      BackdropProps={{
        classes: {
          root: classes.backdrop,
        },
      }}
    >
      <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
        <Box display="flex" justifyContent="flex-end" pb={2}>
          <IconButton
            data-testid={testId}
            color="secondary"
            aria-label="close"
            onClick={handleClose}
            classes={{ root: classes.iconButton }}
          >
            <ModalCloseIcon />
          </IconButton>
        </Box>
        {title}
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        {children}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        {actions.map((action, index) => (
          <Button
            key={`btn-${index}`}
            variant="contained"
            color="primary"
            onClick={action.action}
            data-testid={`btn-${action.testId}`}
          >
            {action.name}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  testId: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      testId: PropTypes.string.isRequired,
    }),
  ),
  classes: PropTypes.shape({
    dialogPaperWidthSm: PropTypes.string.isRequired,
    dialogScrollPaper: PropTypes.string.isRequired,
    dialogPaperScrollPaper: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogContent: PropTypes.string.isRequired,
    dialogActions: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
    iconButton: PropTypes.string.isRequired,
  }).isRequired,
};

Modal.defaultProps = {
  testId: '',
  actions: [],
  title: '',
};

export default withStyles(styles)(Modal);
