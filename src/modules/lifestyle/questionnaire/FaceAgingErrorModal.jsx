import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import Modal from '../../../uiComponents/Modal';
import Typography from '../../../uiComponents/Typography';

import { formatMessage } from '../../../helpers/helpers';

const styles = theme => ({
  dialogPaperWidthSm: {
    maxWidth: 'inherit',
    margin: `${theme.spacingX(16)} ${theme.spacingX(6)}`,
    padding: `${theme.spacingX(6)} ${theme.spacingX(2)}`,
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacingX(32)} ${theme.spacingX(6)}`,
      padding: `${theme.spacingX(6)} ${theme.spacingX(2)}`,
    },
  },
  dialogTitle: {
    padding: `${theme.spacingX(0)} ${theme.spacingX(6)}`,
    paddingBottom: theme.spacingX(2),
  },
  dialogContent: {
    padding: `${theme.spacingX(0)} ${theme.spacingX(6)}`,
    paddingBottom: theme.spacingX(12),
  },
  dialogActions: {
    paddingTop: 0,
  },
  iconButton: {
    marginBottom: theme.spacingX(6),
  },
});

const FaceAgingErrorModal = ({ classes, intl, open, onClose }) => {
  const description = formatMessage(
    intl,
    'lifestyle.questionnaire.faceAgingImageError.description',
    'Upload image failed. Please try again.',
  );

  const renderTitle = () => {
    const title = formatMessage(
      intl,
      'lifestyle.questionnaire.faceAgingImageError.title',
      'Upload Image Failed',
    );

    return (
      <Typography type="style-2" fontWeight="light">
        {title}
      </Typography>
    );
  };

  const actions = [
    {
      name: formatMessage(
        intl,
        'lifestyle.questionnaire.faceAgingImageError.okButton.label',
        'OK',
      ),
      action: () => onClose(),
      testId: 'face-aging-close-modal',
    },
  ];

  return (
    <Modal
      classes={classes}
      title={renderTitle()}
      handleClose={onClose}
      open={open}
      actions={actions}
    >
      <Box>
        <Typography type="style-6">{description}</Typography>
      </Box>
    </Modal>
  );
};

FaceAgingErrorModal.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(styles)(FaceAgingErrorModal));
