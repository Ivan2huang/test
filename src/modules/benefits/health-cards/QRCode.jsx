import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import QRCodeImage from 'qrcode.react';

import { Box } from '@material-ui/core';

import Modal from '../../../uiComponents/Modal';
import Typography from '../../../uiComponents/Typography';
import { formatMessage } from '../../../helpers/helpers';

const Title = ({ title }) => <Typography type="style-2">{title}</Typography>;

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

const QRCode = ({ intl, title, value, open, onClose }) => (
  <Modal title={<Title title={title} />} handleClose={onClose} open={open}>
    <Box width={272}>
      <Typography type="style-6">
        {formatMessage(
          intl,
          'me.tabs.eHealthCard.QRCodeModal.message',
          'Share card details by showing this QR code to clinic staff.',
        )}
      </Typography>
      <Box mt={3} mx={4}>
        <QRCodeImage size={240} value={value} />
      </Box>
    </Box>
  </Modal>
);

QRCode.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default injectIntl(QRCode);
