/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { Box, Button, Tabs, Tab } from '@material-ui/core';
import { withTheme, makeStyles } from '@material-ui/styles';
import { createIntlCache, createIntl, RawIntlProvider } from 'react-intl';
import Router, { useRouter } from 'next/router';
import Typography from '../../../uiComponents/Typography';
import { formatMessage, isValidLanguageCode } from '../../../helpers/helpers';
import breakpoints from '../../../themes/breakpoints';
import CONFIG from '../../../constants/config';
import getLocale from '../../../i18n/getLocale';
import { LOCALE_STORAGE } from '../constants';
import { messages } from '../../../i18n/lang';
import { DEFAULT_LANGUAGE_NAME_MAPPING } from '../../../constants/types';

const cache = createIntlCache();
const navigateToPreviousPage = Router.back;

const getDescriptionStyles = props => {
  const { theme, doesShowTab } = props;
  const minHeight = doesShowTab ? theme.spacingX(94) : theme.spacingX(100);
  const height = doesShowTab
    ? `calc(81vh - ${theme.spacingX(51)})`
    : `calc(100vh - ${theme.spacingX(51)})`;
  const minHeightMdUp = doesShowTab ? theme.spacingX(125) : theme.spacingX(125);
  const heightMdUp = doesShowTab
    ? `calc(100vh - ${theme.spacingX(113)})`
    : `calc(100vh - ${theme.spacingX(113)})`;

  return {
    minHeight,
    height,
    overflowY: 'scroll',
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
    paddingTop: props.theme.spacingX(10),
  }),
});

const Privacy = ({ theme, privacyPolicy, getPrivacyPolicy }) => {
  const { query } = useRouter();
  const userProvidedLocale = isValidLanguageCode(query.lang)
    ? query.lang
    : undefined;
  const locale =
    userProvidedLocale || localStorage.getItem(LOCALE_STORAGE) || getLocale();
  const [selectedTab, setSelectedTab] = useState(locale);
  const doesShowTab = Object.keys(privacyPolicy).length > 1;

  const intl = createIntl(
    {
      locale: selectedTab,
      messages: messages[selectedTab],
    },
    cache,
  );

  // const privacyLocale = lang.map(ln => {
  //   return ln.value;
  // });

  useEffect(() => {
    getPrivacyPolicy(CONFIG.supportedLanguages);
  }, []);

  const classes = useStyles({ theme, doesShowTab });

  const selectTab = value => {
    setSelectedTab(value);
    localStorage.setItem(LOCALE_STORAGE, value);
  };

  return (
    <RawIntlProvider>
      <Box>
        <Typography type="style-2">
          {formatMessage(intl, 'legal.privacy.header', 'Privacy Policy')}
        </Typography>
        {doesShowTab && (
          <Tabs
            classes={{ root: classes.tabContainer }}
            value={selectedTab}
            onChange={(_, value) => selectTab(value)}
          >
            {CONFIG.supportedLanguages.map((spLang, spIndex) => {
              const Label = () => {
                let label = DEFAULT_LANGUAGE_NAME_MAPPING[spLang];
                if (spLang === CONFIG.locales.ENGLISH) {
                  label = label.replace('UK', '').trim();
                }
                return <Typography type="style-4">{label}</Typography>;
              };

              return (
                <Tab
                  key={`${spLang}-tab`}
                  data-testid={`${spLang}-tab`}
                  value={spLang}
                  disableRipple
                  disableFocusRipple
                  classes={{ root: spIndex === 0 ? classes.firstTab : '' }}
                  label={<Label />}
                />
              );
            })}
          </Tabs>
        )}
        <Box mt={6} mb={10} classes={{ root: classes.description }}>
          <Typography type="style-6">
            <span
              dangerouslySetInnerHTML={{
                __html: privacyPolicy[selectedTab],
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
          {formatMessage(intl, 'error.button.goback', 'Go back')}
        </Button>
      </Box>
    </RawIntlProvider>
  );
};

Privacy.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  privacyPolicy: PropTypes.shape({}).isRequired,
  getPrivacyPolicy: PropTypes.func.isRequired,
};

export default withTheme(Privacy);
