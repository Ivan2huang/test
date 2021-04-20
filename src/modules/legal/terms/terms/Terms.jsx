/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import Head from 'next/head';
import { Box, Button, Tabs, Tab } from '@material-ui/core';
import { withTheme, makeStyles } from '@material-ui/styles';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Router, { useRouter } from 'next/router';

import Typography from '../../../../uiComponents/Typography';
import ButtonGroup from '../../../../uiComponents/ButtonGroup';
import {
  formatMessage,
  isValidLanguageCode,
} from '../../../../helpers/helpers';
import paths from '../../../../helpers/paths';
import { getCookie } from '../../../../helpers/auth';
import { LOGGED_IN } from '../../../../constants/auth';
import breakpoints from '../../../../themes/breakpoints';
import CONFIG from '../../../../constants/config';
import getLocale from '../../../../i18n/getLocale';
import { messages } from '../../../../i18n/lang';
import { LOCALE_STORAGE } from '../../constants';
import { DEFAULT_LANGUAGE_NAME_MAPPING } from '../../../../constants/types';

const navigateToPreviousPage = Router.back;
const cache = createIntlCache();

const getDescriptionStyles = props => {
  const { theme, doesShowTab } = props;
  const minHeight = doesShowTab ? theme.spacingX(90) : theme.spacingX(100);
  const height = doesShowTab
    ? `calc(81vh - ${theme.spacingX(51)})`
    : `calc(100vh - ${theme.spacingX(51)})`;
  const minHeightMdUp = doesShowTab ? theme.spacingX(125) : theme.spacingX(125);
  const heightMdUp = `calc(100vh - ${theme.spacingX(120)})`;

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
    paddingTop: props.theme.spacingX(2),
    [breakpoints.up('md')]: {
      paddingTop: props.theme.spacingX(10),
    },
  }),
  link: props => ({
    color: props.theme.hyperlink,
  }),
});

const renderAcceptCheckbox = (classes, isTermsAccepted, onChange, intl) => {
  return (
    <Box>
      <FormControlLabel
        className={classes.root}
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Checkbox
            value={isTermsAccepted}
            color="primary"
            data-testid="checkbox-terms"
            onChange={e => onChange(e.target.checked)}
          />
        }
        label={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Typography type="style-6">
            {formatMessage(
              intl,
              'legal.terms.agree.label',
              'I Accept the terms and conditions',
            )}
          </Typography>
        }
      />
    </Box>
  );
};

const renderPromotionalLink = (intl, classes) => {
  return (
    <a href="/legal/news-letter" className={classes.link}>
      {formatMessage(
        intl,
        'legal.edm.promotional.link',
        'promotional materials',
      )}
    </a>
  );
};

const renderEdmCheckbox = (classes, isEdmAccepted, onChange, intl) => {
  return (
    <Box mb={{ sm: 5, md: 10 }}>
      <FormControlLabel
        className={classes.root}
        control={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Checkbox
            value={isEdmAccepted}
            color="primary"
            data-testid="checkbox-edm"
            onChange={e => onChange(e.target.checked)}
          />
        }
        label={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Typography type="style-6">
            {formatMessage(
              intl,
              'legal.edm.agree.label',
              '(Optional) I do not want to receive health, wellness or insurance {promotional} (by selecting this option, you will not receive our exclusive offers)',
              {
                promotional: renderPromotionalLink(intl, classes),
              },
            )}
          </Typography>
        }
      />
    </Box>
  );
};

const Terms = ({
  acceptTerms,
  theme,
  termLocales,
  termsConditions,
  getTermsConditions,
  alreadyAcceptedTerms,
}) => {
  const { query } = useRouter();
  const userProvidedLocale = isValidLanguageCode(query.lang)
    ? query.lang
    : undefined;
  const locale =
    userProvidedLocale || localStorage.getItem(LOCALE_STORAGE) || getLocale();
  const [selectedTab, setSelectedTab] = useState(locale);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isEdmAccepted, setIsEdmAccepted] = useState(false);

  const doesShowTab = Object.keys(termsConditions).length > 1;
  const isLoggedIn = getCookie(LOGGED_IN);

  const intl = createIntl(
    {
      locale: selectedTab,
      messages: messages[selectedTab],
    },
    cache,
  );

  useEffect(() => {
    getTermsConditions(false, termLocales);
  }, []);

  const selectTab = value => {
    setSelectedTab(value);
    localStorage.setItem(LOCALE_STORAGE, value);
  };

  const onChange = value => {
    setIsTermsAccepted(value);
  };

  const onEdmChange = value => {
    setIsEdmAccepted(value);
  };

  const logout = () => {
    window.localStorage.clear();
    window.open(paths.common.logout, '_self');
  };

  const classes = useStyles({ theme, doesShowTab });

  const displayGoBackButton = alreadyAcceptedTerms || !isLoggedIn;

  const onAccept = () => {
    acceptTerms(isEdmAccepted);
  };

  return (
    <RawIntlProvider>
      <Box>
        <Head>
          <title>
            {formatMessage(intl, 'legal.terms.header', 'Terms & conditions')}
          </title>
        </Head>
        <Typography type="style-2">
          {formatMessage(intl, 'legal.terms.header', 'Terms & conditions')}
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
        <Box
          mt={6}
          mb={{ xs: 5, md: 10 }}
          classes={{ root: classes.description }}
        >
          <Typography type="style-6">
            <span
              dangerouslySetInnerHTML={{
                __html: termsConditions[selectedTab],
              }}
            />
          </Typography>
        </Box>
        {!displayGoBackButton && (
          <>
            {renderAcceptCheckbox(classes, isTermsAccepted, onChange, intl)}
            {renderEdmCheckbox(classes, isEdmAccepted, onEdmChange, intl)}
          </>
        )}
        {displayGoBackButton ? (
          <Button
            data-testid="btn-back-to-previous-page"
            variant="contained"
            color="primary"
            onClick={navigateToPreviousPage}
          >
            {formatMessage(intl, 'error.button.goback', 'Go back')}
          </Button>
        ) : (
          <ButtonGroup>
            <Button
              data-testid="btn-accept-terms"
              variant="contained"
              color="primary"
              onClick={onAccept}
              disabled={!isTermsAccepted}
            >
              {formatMessage(intl, 'legal.terms.agree', 'Agree and continue')}
            </Button>
            <Button
              data-testid="btn-logout"
              variant="outlined"
              color="secondary"
              onClick={logout}
            >
              {formatMessage(
                intl,
                'legal.terms.disagree',
                'Disagree and logout',
              )}
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </RawIntlProvider>
  );
};

Terms.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  termLocales: PropTypes.arrayOf(PropTypes.string),
  termsConditions: PropTypes.shape({}).isRequired,
  getTermsConditions: PropTypes.func.isRequired,
  alreadyAcceptedTerms: PropTypes.bool.isRequired,
  acceptTerms: PropTypes.func.isRequired,
};

Terms.defaultProps = {
  termLocales: [CONFIG.locales.ENGLISH],
};

export default withTheme(Terms);
