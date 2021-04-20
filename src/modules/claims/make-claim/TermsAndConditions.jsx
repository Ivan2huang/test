import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '../../../uiComponents/Typography';
import Modal from '../../../uiComponents/Modal';
import { formatMessage } from '../../../helpers/helpers';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';
import getLocale from '../../../i18n/getLocale';

const style = theme => ({
  content: {
    maxHeight: 'inherit',
    maxWidth: theme.spacingX(190),
    [theme.breakpoints.up('md')]: {
      maxHeight: theme.spacingX(77),
    },
  },
});

const TermsAndConditions = ({
  classes,
  open,
  updateTNCAction,
  updateTNCModal,
  intl,
  content,
}) => {
  const onAcceptTNC = () => {
    logAction({
      category: CATEGORIES.CLAIMS_PAGE,
      action: 'Accept claims t&cs',
    });
    updateTNCModal(false);
    updateTNCAction(true);
  };
  const onNotAcceptTNC = () => {
    updateTNCAction(false);
    updateTNCModal(false);
  };

  const Title = () => (
    <Typography type="style-2">
      {formatMessage(
        intl,
        'claims.termsAndConditions.header',
        'Terms & conditions',
      )}
    </Typography>
  );

  return (
    <Modal
      actions={[
        {
          name: formatMessage(
            intl,
            'claims.termsAndConditions.button.accept',
            'Accept terms & condition',
          ),
          action: onAcceptTNC,
          testId: 'tnc',
        },
      ]}
      title={<Title />}
      handleClose={onNotAcceptTNC}
      testId="modal-close-tnc"
      open={open}
    >
      <Box className={classes.content}>
        <Typography type="style-6">
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: content[getLocale()],
            }}
          />
        </Typography>
      </Box>
    </Modal>
  );
};

TermsAndConditions.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  content: PropTypes.shape({}).isRequired,
  updateTNCAction: PropTypes.func.isRequired,
  updateTNCModal: PropTypes.func.isRequired,
  intl: PropTypes.shape({}).isRequired,
};

export default withStyles(style)(injectIntl(TermsAndConditions));
