import React, { useEffect, useRef, useState } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
  withStyles,
} from '@material-ui/core';

import { formatMessage } from '../../../helpers/helpers';
import ClinicSearchSuggestions from './ClinicSearchSuggestions';
import { getRecentSearch, saveRecentSearch } from './helper';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';
import Search from '../../../icons/Search';

const Styles = () => ({
  searchField: {
    margin: 0,
  },
});

const ClinicSearch = ({
  intl,
  classes,
  areas,
  searchClinic,
  resetMap,
  open,
  setOpen,
}) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchText, setSearchText] = useState('');
  const searchKeywordRef = useRef(null);
  useEffect(() => {
    setRecentSearches(getRecentSearch());
  }, []);

  const handleSearch = (text, searchBy) => {
    const trimmedSearchText = text.trim();
    searchClinic(trimmedSearchText, searchBy);
    if (trimmedSearchText) {
      saveRecentSearch(trimmedSearchText, searchBy);
      setRecentSearches(getRecentSearch());
      logAction({
        category: CATEGORIES.PANEL_CLINIC_SEARCH,
        action: 'Search',
      });
    }
    setSearchText(trimmedSearchText);
    searchKeywordRef.current.blur();
    setOpen(false);
  };

  const showAllClinics = () => {
    setOpen(false);
    resetMap();
    setSearchText('');
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box position="relative">
        <TextField
          fullWidth
          variant="outlined"
          data-testid="search-bar-field"
          autoComplete="off"
          inputRef={searchKeywordRef}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          classes={{ root: classes.searchField }}
          label={formatMessage(
            intl,
            'clinic.searchClinics.label.searchField',
            'Search clinic or location',
          )}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSearch(searchText);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  data-testid="btn-clinic-search"
                  aria-label="search"
                  onClick={() => handleSearch(searchText)}
                >
                  <Search data-testid="img-search" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onFocus={() => setOpen(true)}
        />
        <ClinicSearchSuggestions
          open={open}
          areas={areas}
          onSearch={handleSearch}
          recentSearches={recentSearches}
          showAllClinics={showAllClinics}
        />
      </Box>
    </ClickAwayListener>
  );
};

ClinicSearch.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    searchField: PropTypes.string.isRequired,
  }).isRequired,
  areas: PropTypes.shape({}).isRequired,
  searchClinic: PropTypes.func.isRequired,
  resetMap: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(ClinicSearch);
