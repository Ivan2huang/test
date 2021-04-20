import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  withStyles,
} from '@material-ui/core';

import { ModalCloseIcon } from '../../../icons';
import Images from '../../../constants/images';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import ItemContainer from '../../common/shared/ItemContainer';
import Tip from '../general-tips/Tip';
import Error from '../../common/shared/Error';
import { Recommendations } from '../../common/recommendations';
import config from '../../../constants/config';
import { CATEGORIES } from '../../../constants/analytics';
import { formatMessage } from '../../../helpers/helpers';

const Styles = theme => ({
  dialogPaperWidthSm: ({ color }) => {
    return {
      borderTopWidth: theme.spacingX(1.5),
      borderTopStyle: 'solid',
      borderColor: color,
      height: theme.spacingX(161),
      width: theme.spacingX(250),
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
      backgroundColor: theme.background,
      maxWidth: 'inherit',
      margin: `${theme.spacingX(16)} ${theme.spacingX(6)}`,
      padding: `${theme.spacingX(6)}`,
      [theme.breakpoints.up('md')]: {
        margin: `${theme.spacingX(32)} ${theme.spacingX(6)}`,
        padding: `${theme.spacingX(6)} ${theme.spacingX(12)}`,
        backgroundImage: `url(${Images.LIFESTYLE_RESULT_TIPS_MODAL_BG})`,
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
    overflowX: 'hidden',
  },
  iconButton: {
    padding: 0,
  },
  errorContainer: {
    minHeight: theme.spacingX(50),
    [theme.breakpoints.up('md')]: {
      minHeight: theme.spacingX(149),
    },
  },
  error: {
    minHeight: theme.spacingX(40),
  },
});

const LifestyleResultTipsModal = ({
  intl,
  classes,
  open,
  onClose,
  title,
  description,
  subtitle,
  tips,
  tipCategory,
  errorState,
}) => {
  const renderLifestyleResultCardInfo = () => (
    <>
      <Typography type="style-1">{title}</Typography>
      <Typography type="style-1" fontWeight="bold">
        {subtitle}
      </Typography>
      <Box pt={{ xs: 5, md: 4 }}>
        <Typography type="style-6">{description}</Typography>
      </Box>
    </>
  );

  const renderCloseIconButton = () => (
    <Box display="flex" justifyContent="flex-end" pb={6}>
      <IconButton
        data-testid={`btn-close-${title}`}
        color="secondary"
        aria-label="close"
        onClick={onClose}
        classes={{ root: classes.iconButton }}
      >
        <ModalCloseIcon />
      </IconButton>
    </Box>
  );

  const renderLifestyleTips = () => (
    <ItemContainer itemLength={tips.length} numberOfColumns={4}>
      {tips.map(tip => (
        <Tip
          topic={tip.topic}
          source={tip.source}
          text={tip.text}
          link={tip.link || tip.url}
          key={`key-${title}-${tip.topic}`}
          trackingData={{
            category: CATEGORIES.MY_LIFESTYLE_OVERVIEW,
            action: 'View results',
            risk_type: tip.topic,
          }}
        />
      ))}
    </ItemContainer>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{
        classes: {
          root: classes.backdrop,
        },
      }}
      classes={{
        root: classes.modalRoot,
        paperWidthSm: classes.dialogPaperWidthSm,
        scrollPaper: classes.dialogScrollPaper,
        paperScrollPaper: classes.dialogPaperScrollPaper,
      }}
    >
      <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
        {renderCloseIconButton()}
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Grid>
          <GridItem columns={{ xs: 12, md: 4 }}>
            {renderLifestyleResultCardInfo()}
          </GridItem>
        </Grid>
        <Box pt={{ xs: 5, md: 8 }}>
          <Error errorState={errorState} className={classes.error}>
            {renderLifestyleTips()}
          </Error>
        </Box>
        {config.featureToggleLifestyleSuggestions && (
          <Box mt={{ xs: 5, md: 8 }}>
            <Recommendations
              tipCategory={tipCategory}
              title={formatMessage(
                intl,
                'recommendation.specificProduct.header',
                'Related products',
              )}
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

LifestyleResultTipsModal.defaultProps = {
  tips: [],
};

LifestyleResultTipsModal.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  tips: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string,
      source: PropTypes.string,
      link: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  tipCategory: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    dialogPaperWidthSm: PropTypes.string.isRequired,
    dialogScrollPaper: PropTypes.string.isRequired,
    dialogPaperScrollPaper: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogContent: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
    iconButton: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  errorState: PropTypes.bool.isRequired,
};

export default injectIntl(withStyles(Styles)(LifestyleResultTipsModal));
