import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import {
  Box,
  ClickAwayListener,
  withStyles,
  IconButton,
} from '@material-ui/core';

import ClinicConsultationTypeFilter from './ClinicConsultationTypeFilter';
import ChevronDown from '../../../icons/ChevronDown';
import ChevronUp from '../../../icons/ChevronUp';
import { sentenceCase, formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const Styles = theme => ({
  filterField: {
    margin: 0,
    height: theme.spacingX(14),
    borderColor: theme.lowEmphasis,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: theme.borderRadiusX(1),
  },
  iconButton: {
    padding: theme.spacingX(4),
  },
});

let selectedFilters = {};

const ClinicFilter = ({
  intl,
  classes,
  consultationTypes,
  filterClinic,
  appliedFilters,
  closeSearchPopup,
  open,
  setOpen,
}) => {
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
  const togglePopup = () => {
    if (!open) {
      logAction({
        category: CATEGORIES.PANEL_CLINIC_PAGE,
        action: 'Filter clinics',
      });
    }
    setOpen(!open);
  };

  const onChangeOfFilter = (checked, consultationType) => {
    const filtersClone = Object.assign({}, filters);
    filtersClone[consultationType] = checked;
    setFilters(filtersClone);
  };

  const onApply = () => {
    const selectedFilterLabels = [];
    selectedFilters = Object.assign({}, filters);
    Object.keys(selectedFilters)
      .filter(key => selectedFilters[key] === true)
      .forEach(key => {
        selectedFilterLabels.push(sentenceCase(key));
      });

    filterClinic(selectedFilters);
    setOpen(false);
    logAction({
      category: CATEGORIES.PANEL_CLINIC_SEARCH,
      action: `Filter search by ${selectedFilterLabels.join(', ')}`,
    });
  };

  const onClearAll = () => {
    selectedFilters = {};
    setFilters(selectedFilters);
    filterClinic(selectedFilters);
  };

  const filtersCount = Object.values(filters).filter(value => value).length;
  const renderLabel = () => {
    const selectedOrApplied = open ? 'selected' : 'applied';
    return filtersCount === 0
      ? formatMessage(intl, 'clinic.filter.label.all', 'All clinic types')
      : formatMessage(
          intl,
          `clinic.filter.label.selectedOrApplied`,
          `${filtersCount} filter(s) ${selectedOrApplied}`,
          {
            filtersCount,
            selectedOrApplied,
          },
        );
  };
  return (
    <ClickAwayListener onClickAway={() => open && closePopup()}>
      <Box position="relative" pt={5} onFocus={() => closeSearchPopup()}>
        <Box
          className={classes.filterField}
          onClick={togglePopup}
          display="flex"
          alignItems="center"
          data-testid="field-filter"
          justifyContent="space-between"
          pl={4}
        >
          <Typography type="style-6">{renderLabel()}</Typography>
          <IconButton className={classes.iconButton}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </Box>
        <ClinicConsultationTypeFilter
          open={open}
          consultationTypes={consultationTypes}
          onChange={onChangeOfFilter}
          filters={filters}
          onApply={onApply}
          onClearAll={onClearAll}
        />
      </Box>
    </ClickAwayListener>
  );
};

ClinicFilter.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    filterField: PropTypes.string.isRequired,
    iconButton: PropTypes.string.isRequired,
  }).isRequired,
  consultationTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterClinic: PropTypes.func.isRequired,
  appliedFilters: PropTypes.shape({}).isRequired,
  closeSearchPopup: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(ClinicFilter);
