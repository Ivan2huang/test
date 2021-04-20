import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Fab, withStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import { ArrowUpIcon } from '../../../icons';
import { formatMessage } from '../../../helpers/helpers';
import { CATEGORIES } from '../../../constants/analytics';
import { trackingAnchor } from '../../../helpers/firebase';

const Styles = theme => ({
  header: {
    marginBottom: theme.spacingX(8),
  },
  anchorTag: {
    color: theme.hyperlink,
    textDecoration: 'none',
    display: 'block',
    zIndex: 0,
  },
  anchor: ({ isWalletsDisabled }) => ({
    marginTop: theme.spacingX(12),
    marginBottom: theme.spacingX(8),

    '&&::before': {
      display: 'block',
      content: '""',
      marginTop: theme.spacingX(-(isWalletsDisabled ? 20 : 34)),
      height: isWalletsDisabled ? '80px' : '136px',
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  }),
  scrollToTopButton: {
    textAlign: 'right',
    paddingRight: theme.spacingX(1),
  },
});

const FAQs = ({ classes, faqs, intl }) => {
  return (
    <>
      <Typography type="style-3" className={classes.header}>
        {formatMessage(
          intl,
          'me.tabs.help.faqs.header',
          'Frequently asked questions',
        )}
      </Typography>

      {faqs.map(faq => (
        <Typography
          type="style-7"
          key={faq.name}
          component="a"
          onClick={trackingAnchor}
          data-testid={`${faq.name}-link`}
          className={classes.anchorTag}
          href={`#${faq.name}`}
          data-category={CATEGORIES.HELP_PAGE}
          data-action="Select FAQ question"
        >
          {faq.name}
        </Typography>
      ))}

      {faqs.map(faq => (
        <Fragment key={faq.name}>
          <Typography id={faq.name} className={classes.anchor} type="style-4">
            {faq.name}
          </Typography>
          <Typography
            type="style-6"
            component="span"
            dangerouslySetInnerHTML={{
              __html: faq.content,
            }}
          />
        </Fragment>
      ))}
      <div data-testid="scrollToTop" className={classes.scrollToTopButton}>
        <Fab color="primary" component="a" href="#help">
          <ArrowUpIcon />
        </Fab>
      </div>
    </>
  );
};

FAQs.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.any).isRequired,
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    header: PropTypes.string.isRequired,
    anchorTag: PropTypes.string.isRequired,
    anchor: PropTypes.string.isRequired,
    scrollToTopButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(withStyles(Styles)(FAQs));
