import React from 'react';
import * as PropTypes from 'prop-types';

import { Box, Card, Divider, withStyles } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import Typography from '../../../uiComponents/Typography';
import { LaunchIcon } from '../../../icons';
import theme from '../../../themes/theme';
import { formatMessage, onEnter } from '../../../helpers/helpers';
import { logAction } from '../../../helpers/firebase';

const Styles = () => ({
  muiCardRoot: {
    background: theme.white,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    outline: 'unset',
  },
  source: {
    paddingTop: theme.spacingX(1),
  },
  textContainer: {
    height: '100%',
  },
  launchIcon: {
    marginLeft: theme.spacing(1),
  },
});

const Tip = ({ topic, source, link, text, classes, intl, trackingData }) => {
  const navigateTo = () => {
    window.open(link, '_blank');
    if (trackingData) {
      logAction(trackingData);
    }
  };
  return (
    <Card
      classes={{ root: classes.muiCardRoot }}
      data-testid={`card-${topic}`}
      onClick={navigateTo}
      onKeyPress={event => onEnter(event, navigateTo)}
      aria-label={formatMessage(
        intl,
        'lifestyle.tip.learnMoreAbout',
        `Learn more about ${topic}`,
        { category: topic },
      )}
    >
      <Box display="flex" flexDirection="column" height="100%" tabIndex="0">
        <Box py={8} px={6} className={classes.textContainer}>
          <Box pb={4}>
            <Typography type="style-7">{topic}</Typography>
            <Typography type="style-6" className={classes.source}>
              {formatMessage(intl, 'lifestyle.tip.by', `by ${source}`, {
                source,
              })}
            </Typography>
          </Box>
          <Typography type="style-6" color="lowEmphasis">
            {text}
          </Typography>
        </Box>
        <Divider />
        <Box py={4} px={6} display="flex" alignItems="center" tabIndex="0">
          <Typography type="style-6" color="hyperlink">
            {formatMessage(intl, 'lifestyle.tip.learnMore', 'Learn more')}
          </Typography>
          <LaunchIcon className={classes.launchIcon} />
        </Box>
      </Box>
    </Card>
  );
};

Tip.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    muiCardRoot: PropTypes.string.isRequired,
    launchIcon: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    textContainer: PropTypes.string.isRequired,
  }).isRequired,
  topic: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  trackingData: PropTypes.shape({
    category: PropTypes.string,
    action: PropTypes.string,
    risk_type: PropTypes.string,
  }),
};

Tip.defaultProps = {
  trackingData: null,
};

export default injectIntl(withStyles(Styles)(Tip));
