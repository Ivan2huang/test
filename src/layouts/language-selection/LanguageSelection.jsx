import React, { useContext, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Box, makeStyles, Menu, MenuItem, withStyles } from '@material-ui/core';
import Typography from '../../uiComponents/Typography';
import { formatMessage } from '../../helpers/helpers';
import IMAGES from '../../constants/images';
import { LOCALE_STORAGE } from '../../modules/legal/constants';
import { IntlContext } from '../../i18n/withIntlProvider';
import getLocale from '../../i18n/getLocale';

const useStyles = makeStyles(theme => ({
  selectedLanguge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    border: 'none',
    background: 'transparent',
    '& > div': {
      color: theme.footerLink || theme.defaultHyperlink,
    },
  },
  flag: {
    width: '1.125rem',
    height: '1.125rem',
    marginRight: theme.spacingX(2),
  },
  header: {
    padding: '6px 16px',
  },
}));

const StyledMenuItem = withStyles(() => ({
  root: {
    '&:focus:not(.Mui-selected)': {
      background: 'rgba(0, 0, 0, 0.14)',
    },
  },
}))(MenuItem);

const LanguageSelection = ({ updateLanguagePreference, languages }) => {
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const setLocale = useContext(IntlContext);
  const { replace, query, pathname } = useRouter();

  const openMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onLanguagesChange = lang => {
    if (query.lang) {
      replace({ pathname, query: { ...query, lang } });
    }
    localStorage.setItem(LOCALE_STORAGE, lang);
    updateLanguagePreference(lang, setLocale, query.clientId);
    setAnchorEl(null);
  };

  const selectedLanguge = formatMessage(
    intl,
    'footer.language.selectedLanguage',
    'UK English',
  );
  const selectedFlag = formatMessage(
    intl,
    'footer.language.selectedFlag',
    IMAGES.FLAG_EN,
  );
  return (
    <>
      <Box
        aria-controls="select-languages"
        aria-haspopup="true"
        tabIndex={0}
        className={classes.selectedLanguge}
        onClick={openMenu}
        component="button"
      >
        <img
          alt={selectedLanguge}
          src={selectedFlag}
          className={classes.flag}
        />
        <Typography type="style-8">{selectedLanguge}</Typography>
      </Box>
      <Menu
        id="select-languages"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <Typography
          type="style-10"
          color="highEmphasis"
          className={classes.header}
        >
          {formatMessage(
            intl,
            'footer.language.selection',
            'Language Selection',
          )}
        </Typography>
        {Object.entries(languages).map(([key, { image, label }]) => {
          return (
            <StyledMenuItem
              tabIndex={0}
              key={key}
              onClick={() => onLanguagesChange(key)}
              selected={key === getLocale()}
            >
              <img alt={label} src={image} className={classes.flag} />
              <Typography type="style-8" color="highEmphasis">
                {label}
              </Typography>
            </StyledMenuItem>
          );
        })}
      </Menu>
    </>
  );
};
LanguageSelection.propTypes = {
  updateLanguagePreference: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
};
export default LanguageSelection;
