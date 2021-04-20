import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Box, Card, withStyles, Divider } from '@material-ui/core';
import { injectIntl } from 'react-intl';

import Typography from '../../../uiComponents/Typography';
import LifestyleResultTipsModal from './LifestyleResultTipsModal';
import { onEnter, formatMessage } from '../../../helpers/helpers';
import { LaunchIcon } from '../../../icons';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const styles = theme => ({
  container: {
    borderTopWidth: '6px',
    borderTopStyle: 'solid',
    background: theme.white,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    borderColor: ({ color }) => color,
  },
  learnMore: {
    color: theme.hyperlink,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
});
const ResultCard = ({
  intl,
  id,
  classes,
  CardIcon,
  title,
  subTitle,
  description,
  color,
  tips,
  tipCategory,
  lifestyleTipsErrorState,
}) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
    logAction({
      category: CATEGORIES.MY_LIFESTYLE_OVERVIEW,
      action: `View results ${id}`,
    });
  };

  return (
    <>
      <Card
        tabIndex={0}
        classes={{ root: classes.container }}
        data-testid={`card-${title}`}
        onClick={openModal}
        onKeyPress={event => onEnter(event, openModal)}
        aria-label={formatMessage(
          intl,
          'lifestyle.tip.learnMoreAbout',
          `Learn more about ${title}`,
          { category: title },
        )}
      >
        <Box display="flex" flexDirection="column" height="100%">
          <Box display="flex" flexDirection="column" height="100%">
            <Box display="flex" alignItems="center" py={7} px={6}>
              <Box mr={4}>{CardIcon}</Box>
              <Box>
                <Typography type="style-5">{title}</Typography>
                <Typography type="style-7">{subTitle}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" py={7} px={6}>
              <Typography type="style-6">{description}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            py={4}
            px={6}
            display="flex"
            alignItems="center"
            className={classes.learnMore}
            tabIndex={0}
          >
            <Typography type="style-6" color="hyperlink">
              {formatMessage(intl, 'lifestyle.tip.learnMore', 'Learn more')}
            </Typography>
            <LaunchIcon className={classes.icon} />
          </Box>
        </Box>
      </Card>
      <LifestyleResultTipsModal
        tipCategory={tipCategory}
        open={open}
        onClose={closeModal}
        status={color}
        description={description}
        subtitle={subTitle}
        title={title}
        tips={tips}
        color={color}
        errorState={lifestyleTipsErrorState}
      />
    </>
  );
};

ResultCard.defaultProps = {
  tips: [],
};

ResultCard.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
  tips: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string,
      source: PropTypes.string,
      link: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  tipCategory: PropTypes.string.isRequired,
  classes: PropTypes.exact({
    container: PropTypes.string.isRequired,
    learnMore: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  CardIcon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  lifestyleTipsErrorState: PropTypes.bool.isRequired,
};

export default injectIntl(withStyles(styles)(ResultCard));
