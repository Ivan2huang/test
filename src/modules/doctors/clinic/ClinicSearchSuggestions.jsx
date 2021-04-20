/* eslint-disable react/no-array-index-key */

import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import {
  Card,
  Hidden,
  MenuItem,
  MenuList,
  Box,
  withStyles,
} from '@material-ui/core';

import { formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import { ShowAllClinicsIcon } from '../../../icons';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const Styles = theme => ({
  container: {
    position: 'absolute',
    zIndex: 1000,
    overflowY: 'auto',
    maxHeight: '50vh',
    width: '100%',
    marginTop: theme.spacingX(1),
    background: theme.white,
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '70vh',
    },
  },
});

const RECENT_SEARCH_INTL_IDS = {
  area: 'clinic.searchClinics.suggestions.recentSearch.label.area',
  district: 'clinic.searchClinics.suggestions.recentSearch.label.district',
};

const ClinicSearchSuggestions = ({
  intl,
  classes,
  areas,
  recentSearches,
  open,
  onSearch,
  showAllClinics,
}) => {
  const trackingRecentSearch = recentSearch => {
    logAction({
      category: CATEGORIES.PANEL_SEARCH_RESULT,
      action: `Clicks on Recent searches`,
    });

    onSearch(recentSearch.keyword, recentSearch.searchBy);
  };

  const trackingAreaOrDistrictSearch = (textContent, searchBy) => {
    const config = {
      category: CATEGORIES.PANEL_SEARCH_RESULT,
      action: `Click on the Areas list`,
    };

    if (searchBy === 'district') {
      config.action = `Click on the District list`;
    }

    logAction(config);
    onSearch(textContent, searchBy);
  };

  const renderRecentSearch = () => {
    return (
      <Box>
        <MenuItem disabled>
          <Typography type="style-5">
            {formatMessage(
              intl,
              'clinic.searchClinics.suggestions.label.recentSearch',
              'Recent search',
            )}
          </Typography>
        </MenuItem>
        {recentSearches.map((recentSearch, index) => (
          <MenuItem
            tabIndex={0}
            key={`${recentSearch.keyword}-${index}`}
            onClick={() => trackingRecentSearch(recentSearch)}
          >
            <Typography type="style-5">
              {recentSearch.searchBy
                ? `${recentSearch.keyword} (${formatMessage(
                    intl,
                    RECENT_SEARCH_INTL_IDS[recentSearch.searchBy],
                    recentSearch.searchBy,
                  )})`
                : recentSearch.keyword}
            </Typography>
          </MenuItem>
        ))}
      </Box>
    );
  };
  const renderSuggestionSection = (title, items, searchBy) => {
    return (
      <Box>
        <MenuItem disabled>
          <Typography type="style-5">{title}</Typography>
        </MenuItem>
        {items.map((item, index) => (
          <MenuItem
            tabIndex={0}
            key={`${searchBy}-${index}`}
            onClick={event =>
              trackingAreaOrDistrictSearch(event.target.textContent, searchBy)
            }
            data-testid={`search-by-${searchBy}`}
          >
            <Typography type="style-5">{item}</Typography>
          </MenuItem>
        ))}
      </Box>
    );
  };

  return (
    <Card
      classes={{ root: classes.container }}
      implementation="css"
      xsUp={!open}
      component={Hidden}
    >
      <MenuList>
        <MenuItem onClick={showAllClinics}>
          <ShowAllClinicsIcon />
          <Box ml={4}>
            <Typography type="style-5">
              {formatMessage(
                intl,
                'clinic.searchClinics.suggestions.label.showAllClinics',
                'Show all clinics',
              )}
            </Typography>
          </Box>
        </MenuItem>
        {recentSearches.length > 0 && renderRecentSearch()}
        {renderSuggestionSection(
          formatMessage(
            intl,
            'clinic.searchClinics.suggestions.label.areas',
            'Areas',
          ),
          Object.keys(areas),
          'area',
        )}

        {Object.entries(areas).map(([area, districts], areaIndex) => (
          <Box key={`district-${areaIndex}`}>
            {renderSuggestionSection(
              formatMessage(
                intl,
                'clinic.searchClinics.suggestions.label.district',
                `District - ${area}`,
                {
                  area,
                },
              ),
              districts,
              'district',
            )}
          </Box>
        ))}
      </MenuList>
    </Card>
  );
};

ClinicSearchSuggestions.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
  }).isRequired,
  areas: PropTypes.shape({}).isRequired,
  recentSearches: PropTypes.arrayOf(
    PropTypes.exact({
      keyword: PropTypes.string,
      searchBy: PropTypes.string,
    }),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  showAllClinics: PropTypes.func.isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(ClinicSearchSuggestions);
