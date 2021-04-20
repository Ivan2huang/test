import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Card, withStyles } from '@material-ui/core';
import Typography from '../../../uiComponents/Typography';
import CompanyContactDetails from './CompanyContactDetails';
import FAQs from './FAQs';

const Styles = theme => ({
  title: ({ isWalletsDisabled }) => ({
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacingX(8),
    },
    '&::before': {
      display: 'block',
      content: '""',
      marginTop: theme.spacingX(-(isWalletsDisabled ? 20 : 34)),
      height: theme.spacingX(isWalletsDisabled ? 20 : 34),
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  }),
  wrapper: {
    padding: `${theme.spacingX(10)} ${theme.spacingX(0)}`,

    '&&:last-child': {
      paddingBottom: theme.spacingX(10),
    },

    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacingX(10)} ${theme.spacingX(12)}`,
    },
  },
});

// let previousLoadingState = false;
const Help = ({
  classes,
  companyContactDetails,
  faqs,
  intl,
  isWalletsDisabled,
  loaded,
}) => {
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   setLoaded(previousLoadingState && !loading);
  //   previousLoadingState = loading;
  // }, [loading]);

  return (
    loaded && (
      <>
        <Typography type="style-2" id="help" className={classes.title}>
          {intl.formatMessage({
            id: 'me.tabs.help.title',
            defaultMessage: 'Help',
          })}
        </Typography>
        <Card className={classes.wrapper}>
          <CompanyContactDetails
            companyContactDetails={companyContactDetails}
          />
        </Card>
        <Card className={classes.wrapper}>
          <FAQs faqs={faqs} isWalletsDisabled={isWalletsDisabled} />
        </Card>
      </>
    )
  );
};

Help.propTypes = {
  companyContactDetails: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  faqs: PropTypes.arrayOf(PropTypes.any).isRequired,
  classes: PropTypes.exact({
    title: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }).isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(Help);
