import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';

import { formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import Modal from '../../../uiComponents/Modal';

export const Styles = theme => ({
  dialogPaperWidthSm: () => {
    return {
      height: theme.spacingX(161),
      width: theme.spacingX(250),
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
      backgroundColor: theme.background,
      maxWidth: 'inherit',
      margin: `${theme.spacingX(16)} ${theme.spacingX(6)}`,
      padding: `${theme.spacingX(6)}`,
      [theme.breakpoints.up('md')]: {
        margin: `${theme.spacingX(20)} ${theme.spacingX(6)}`,
        padding: `${theme.spacingX(6)} ${theme.spacingX(12)}`,
      },
    };
  },
  dialogScrollPaper: {
    alignItems: 'flex-start',
  },
  dialogPaperScrollPaper: {
    maxHeight: `calc(100% - ${theme.spacingX(32)})`,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  dialogTitle: {
    padding: 0,
  },
  dialogContent: {
    padding: 0,
    marginTop: theme.spacingX(2),
    overflowX: 'hidden',
  },
  iconButton: {
    padding: 0,
  },
});

const WellnessNewsletterModal = ({
  intl,
  classes,
  handleClose,
  open,
  content,
}) => {
  const renderTitle = () => (
    <Typography type="style-2">
      {formatMessage(
        intl,
        'me.tab.setting.modal.promotional.title',
        'Wellness Newsletter',
      )}
    </Typography>
  );

  return (
    <Modal
      title={renderTitle()}
      open={open}
      handleClose={handleClose}
      classes={classes}
    >
      <Typography type="style-6">
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Typography>
    </Modal>
  );
};

WellnessNewsletterModal.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    dialogPaperWidthSm: PropTypes.string.isRequired,
    dialogScrollPaper: PropTypes.string.isRequired,
    dialogPaperScrollPaper: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogContent: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
    iconButton: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(Styles)(injectIntl(WellnessNewsletterModal));
