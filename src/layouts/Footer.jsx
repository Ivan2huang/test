import React from 'react';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Typography from '../uiComponents/Typography';
import Images from '../constants/images';
import { formatMessage, navigateTo } from '../helpers/helpers';
import paths from '../helpers/paths';
import LanguageSelection from './LanguageSelectionContainer';
import CONFIG from '../constants/config';
import distributors from '../constants/distributors';

const useStyles = makeStyles({
  footerContainer: ({ theme, displayMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: theme.spacingX(28),
    backgroundColor: theme.transparent,
    color: theme.highEmphasis,
    alignItems: 'center',
    boxSizing: 'border-box',
    bottom: theme.spacingX(14),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: theme.spacingX(24),
    },
    [theme.breakpoints.down('sm')]: {
      display: displayMobile ? 'flex' : 'none',
      paddingBottom: theme.spacingX(4),
    },
  }),
  linksContainer: ({ theme }) => ({
    '& > *::after': {
      content: '""',
      height: theme.spacingX(4),
      borderRight: `2px solid ${theme.lowEmphasis}`,
      marginLeft: theme.spacingX(4),
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacingX(2),
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacingX(3.75),
      marginBottom: theme.spacingX(3.75),
      marginLeft: theme.spacingX(0),
    },
    [theme.breakpoints.up('md')]: {
      '& > *:last-child::after': {
        content: '""',
      },
    },
  }),
  link: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    paddingLeft: theme.spacingX(4),
    paddingRight: 0,
    marginTop: 2,
    '&:last-child': {
      '&::after': {
        content: 'none',
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacingX(2),
    },

    '&: focus': {
      outline: `1px solid ${theme.grey2}`,
    },

    '& > button': {
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      '& > div': {
        color: theme.footerLink || theme.defaultHyperlink,
      },
    },
  }),
});

const distributor = distributors[CONFIG.themeCode];

const Footer = ({ intl, displayMobile }) => {
  const navigateToPrivacy = () => navigateTo(paths.common.privacy);
  const navigateToTerms = () => navigateTo(paths.common.terms);
  const navigateToContactUs = () => navigateTo(paths.common.contactUs);
  const classes = useStyles({ theme: useTheme(), displayMobile });
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Box p={{ xs: 2, md: 10 }} className={classes.footerContainer}>
        <Box>
          <Typography type="style-8" color="highEmphasis">
            &#9400;&nbsp;
            {formatMessage(
              intl,
              'footer.rights',
              `${currentYear} ${distributor} group. All Rights Reserved.`,
              {
                currentYear,
                distributor,
              },
            )}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            className={classes.linksContainer}
            mb={{ xs: 1, md: 0 }}
          >
            <Box classes={{ root: classes.link }}>
              <button
                data-testid="link-contact"
                type="button"
                onClick={navigateToContactUs}
              >
                <Typography type="style-8">
                  {formatMessage(intl, 'footer.link.contactUs', 'Contact Us')}
                </Typography>
              </button>
            </Box>
            <Box classes={{ root: classes.link }}>
              <LanguageSelection />
            </Box>
            <Box classes={{ root: classes.link }}>
              <button
                data-testid="link-terms"
                type="button"
                onClick={navigateToTerms}
              >
                <Typography type="style-8">
                  {formatMessage(intl, 'footer.link.terms', 'Terms')}
                </Typography>
              </button>
            </Box>
            <Box classes={{ root: classes.link }}>
              <button
                type="button"
                onClick={navigateToPrivacy}
                data-testid="link-privacy"
              >
                <Typography type="style-8">
                  {formatMessage(intl, 'footer.link.privacy', 'Privacy')}
                </Typography>
              </button>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            pl={{ xs: 0, md: 4 }}
            mb={{ xs: 1, md: 0 }}
          >
            <Typography type="style-8" color="grey2">
              {formatMessage(intl, 'footer.poweredBy', 'Powered by')}
            </Typography>
            &nbsp;
            <img src={Images.FOOTER_LOGO} alt="" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

Footer.defaultProps = {
  displayMobile: false,
};

Footer.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  displayMobile: PropTypes.bool,
};

export default injectIntl(Footer);
