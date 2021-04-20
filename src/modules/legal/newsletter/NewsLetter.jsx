/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { Box, Button, Tabs, Tab } from '@material-ui/core';
import { withTheme, makeStyles } from '@material-ui/styles';
import Router from 'next/router';
import Head from 'next/head';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import Typography from '../../../uiComponents/Typography';
import { formatMessage } from '../../../helpers/helpers';
import breakpoints from '../../../themes/breakpoints';
import CONFIG from '../../../constants/config';
import getLocale from '../../../i18n/getLocale';
import { messages } from '../../../i18n/lang';
import { LOCALE_STORAGE } from '../constants';

const navigateToPreviousPage = Router.back;
const cache = createIntlCache();

const getDescriptionStyles = props => {
  const { theme } = props;
  const minHeight = theme.spacingX(90);
  const height = `calc(81vh - ${theme.spacingX(51)})`;
  const minHeightMdUp = theme.spacingX(75);
  const heightMdUp = `calc(100vh - ${theme.spacingX(200)})`;

  return {
    minHeight,
    height,
    overflowY: 'auto',
    textAlign: 'left',
    paddingRight: theme.spacingX(3),
    [breakpoints.up('md')]: {
      minHeight: minHeightMdUp,
      height: heightMdUp,
    },
  };
};

const useStyles = makeStyles({
  description: getDescriptionStyles,
  firstTab: props => ({
    marginRight: props.theme.spacingX(10),
  }),
  tabContainer: props => ({
    paddingTop: props.theme.spacingX(2),
    [breakpoints.up('md')]: {
      paddingTop: props.theme.spacingX(10),
    },
  }),
});

const NewsLetter = ({ theme, newsLetter, getNewsLetter }) => {
  const locale = localStorage.getItem(LOCALE_STORAGE) || getLocale();
  const [selectedTab, setSelectedTab] = useState(locale);

  const intl = createIntl(
    {
      locale: selectedTab,
      messages: messages[selectedTab],
    },
    cache,
  );

  useEffect(() => {
    // get news letter content
    getNewsLetter();
  }, []);

  const selectTab = value => {
    setSelectedTab(value);
    localStorage.setItem(LOCALE_STORAGE, value);
  };

  const classes = useStyles({ theme });

  return (
    <RawIntlProvider>
      <Box>
        <Head>
          <title>
            {formatMessage(intl, 'legal.edm.header', 'Wellness Newsletter')}
          </title>
        </Head>
        <Typography type="style-2">
          {formatMessage(intl, 'legal.edm.header', 'Wellness Newsletter')}
        </Typography>
        <Tabs
          classes={{ root: classes.tabContainer }}
          value={selectedTab}
          onChange={(_, value) => selectTab(value)}
        >
          <Tab
            data-testid="english-tab"
            value={CONFIG.locales.ENGLISH}
            disableRipple
            disableFocusRipple
            classes={{ root: classes.firstTab }}
            label={<Typography type="style-4">English</Typography>}
          />
          <Tab
            data-testid="chinese-tab"
            value={CONFIG.locales.CHINESE}
            disableRipple
            disableFocusRipple
            label={<Typography type="style-4">中文</Typography>}
          />
        </Tabs>
        <Box
          mt={6}
          mb={{ xs: 5, md: 10 }}
          classes={{ root: classes.description }}
        >
          <Typography type="style-6">
            <span
              dangerouslySetInnerHTML={{
                __html: newsLetter[selectedTab],
              }}
            />
          </Typography>
        </Box>
        <Button
          data-testid="btn-back-to-previous-page"
          variant="contained"
          color="primary"
          onClick={navigateToPreviousPage}
        >
          {formatMessage(
            intl,
            'legal.newsletter.button.goback',
            'Go back to the previous screen',
          )}
        </Button>
      </Box>
    </RawIntlProvider>
  );
};

NewsLetter.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  newsLetter: PropTypes.shape({}).isRequired,
  getNewsLetter: PropTypes.func.isRequired,
};

export default withTheme(NewsLetter);
