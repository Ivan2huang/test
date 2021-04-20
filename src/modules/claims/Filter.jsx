import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import cloneDeep from 'lodash/cloneDeep';

import { Box, ClickAwayListener, withStyles } from '@material-ui/core';

import TrackingButton from '../../uiComponents/TrackingButton';
import { formatMessage, isEmpty } from '../../helpers/helpers';
import Typography from '../../uiComponents/Typography';
import { FilterActive, FilterInactive } from '../../icons';
import FilterOptions from './FilterOptions';
import { CATEGORIES } from '../../constants/analytics';

const Styles = theme => ({
  root: {
    marginTop: theme.spacingX(14),
    marginBottom: theme.spacingX(8),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacingX(8),
      marginBottom: theme.spacingX(2),
    },
  },
  filterButton: {
    width: 'auto',
    padding: theme.spacingX(4),
    paddingTop: theme.spacingX(1),
    paddingBottom: theme.spacingX(1),
    borderRadius: '31px',
    backgroundColor: theme.background,
  },
  filterOptions: {
    position: 'absolute',
    zIndex: 9999,
    [theme.breakpoints.down('sm')]: {
      left: '0px',
    },
    [theme.breakpoints.up('md')]: {
      right: '0px',
    },
  },
  filterField: {
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },
  activeFilter: {
    borderColor: theme.primary,
  },
});

let selectedFilters = {};

const Filter = ({
  intl,
  classes,
  options,
  mappers,
  filterClaims,
  appliedFilters,
  localizeOptionsKeyPrefix,
}) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(appliedFilters);
  selectedFilters = appliedFilters;
  useEffect(() => {
    selectedFilters = Object.assign({}, filters);
  }, []);

  useEffect(() => {
    setFilters(appliedFilters);
    selectedFilters = Object.assign({}, filters);
  }, [appliedFilters]);

  const closePopup = () => {
    setFilters(selectedFilters);
    setOpen(false);
  };
  const togglePopup = () => setOpen(!open);

  const onChangeOfFilter = (checked, { key, option }) => {
    const filtersClone = cloneDeep(filters);
    filtersClone[key] = filtersClone[key] || {};
    filtersClone[key][option] = checked;
    if (!checked) {
      delete filtersClone[key][option];
    }
    if (!filtersClone[key] || isEmpty(filtersClone[key])) {
      delete filtersClone[key];
    }
    setFilters(filtersClone);
  };

  const onApply = () => {
    setOpen(false);
    selectedFilters = Object.assign({}, filters);
    filterClaims(selectedFilters);
  };

  const onClearAll = () => {
    selectedFilters = {};
    setFilters(selectedFilters);
  };

  const filtersCount = Object.values(filters).reduce((sum, filter) => {
    const count = Object.values(filter).filter(Boolean).length;
    return sum + count;
  }, 0);
  const hasFilters = filtersCount > 0;
  const renderLabel = () => {
    return !hasFilters
      ? formatMessage(intl, 'claim.filter.label', 'Filter')
      : formatMessage(
          intl,
          `claim.filter.label.filterApplied`,
          `Filter ({filtersCount})`,
          {
            filtersCount,
          },
        );
  };
  return (
    <ClickAwayListener onClickAway={() => open && closePopup()}>
      <Box position="relative" className={classes.root}>
        <Box display="flex" alignItems="center" className={classes.filterField}>
          <TrackingButton
            onClick={togglePopup}
            variant="outlined"
            data-testid="field-filter"
            className={`${classes.filterButton} ${
              hasFilters ? classes.activeFilter : ''
            }`}
            startIcon={hasFilters ? <FilterActive /> : <FilterInactive />}
            trackingData={{
              category: CATEGORIES.CLAIMS_PAGE,
              action: 'Filter claims',
            }}
          >
            <Typography type="style-6" color="highEmphasis">
              {renderLabel()}
            </Typography>
          </TrackingButton>
        </Box>
        <Box className={classes.filterOptions} data-testid="filter-options">
          <FilterOptions
            options={options}
            mappers={mappers}
            open={open}
            filters={filters}
            onChange={onChangeOfFilter}
            onApply={onApply}
            onClearAll={onClearAll}
            localizeOptionsKeyPrefix={localizeOptionsKeyPrefix}
          />
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

Filter.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    filterField: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({}).isRequired,
  mappers: PropTypes.shape({}).isRequired,
  filterClaims: PropTypes.func.isRequired,
  appliedFilters: PropTypes.shape({}).isRequired,
  localizeOptionsKeyPrefix: PropTypes.string.isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(Filter);
