import React from 'react';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import Image from '../../../uiComponents/Image';
import Modal from '../../../uiComponents/Modal';

export const style = theme => ({
  content: {
    maxHeight: 'inherit',
    maxWidth: theme.spacingX(190),

    '& img': {
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'auto',
      },
    },
  },
});

const AttachmentPreview = ({
  classes,
  open,
  attachment,
  updatePreviewModal,
}) => {
  const handleClose = () => {
    updatePreviewModal(false);
  };
  return (
    <Modal open={open} handleClose={handleClose} testId="close-preview">
      <Box className={classes.content}>
        {attachment && <Image src={attachment.file} />}
      </Box>
    </Modal>
  );
};

AttachmentPreview.defaultProps = {
  attachment: null,
};

AttachmentPreview.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  updatePreviewModal: PropTypes.func.isRequired,
  attachment: PropTypes.shape({
    name: PropTypes.string,
    file: PropTypes.object,
  }),
};

export default withStyles(style)(AttachmentPreview);
