import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';

import {
  Card,
  Box,
  Hidden,
  MenuItem,
  MenuList,
  withStyles,
  Divider,
} from '@material-ui/core';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { FILTER_ITEM_TYPE } from './constant';
import Typography from '../../uiComponents/Typography';
import ButtonGroup from '../../uiComponents/ButtonGroup';
import TrackingButton from '../../uiComponents/TrackingButton';
import { sentenceCase, formatMessage } from '../../helpers/helpers';
import { CATEGORIES } from '../../constants/analytics';

const Styles = theme => ({
  root: {
    margin: '0px',
    width: '100%',
  },
  container: {
    maxHeight: '320px',
    width: 'auto',
    minWidth: '296px',
    marginTop: theme.spacingX(1),
    background: theme.white,
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '390px',
    },
  },
  listContainer: {
    maxHeight: 'calc(320px - 72px)',
    overflowY: 'auto',
    padding: `0px ${theme.spacingX(2)}`,
  },
  optionTitle: {
    padding: `0px ${theme.spacingX(3)}`,
    paddingTop: `${theme.spacingX(4)}`,
  },
  sectionDivider: {
    margin: `0px ${theme.spacingX(3)}`,
  },
});

const FilterOptions = ({
  intl,
  classes,
  options,
  mappers,
  open,
  onChange,
  filters,
  onApply,
  onClearAll,
  localizeOptionsKeyPrefix,
}) => {
  const renderOptionTitle = key => {
    return (
      <MenuItem key={`${key}`} disableGutters>
        <Typography
          fontWeight="semiBold"
          type="style-4"
          color="highEmphasis"
          className={classes.optionTitle}
        >
          {formatMessage(
            intl,
            `${localizeOptionsKeyPrefix}.${key}`,
            `${sentenceCase(key)}`,
          )}
        </Typography>
      </MenuItem>
    );
  };

  const renderOptionItems = (key, filterOptions, mapper) => {
    return filterOptions.map(option => (
      <MenuItem key={`${key}-${option}`} disableGutters>
        <FormControlLabel
          className={classes.root}
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox
              value={option}
              checked={!!get(filters, [key, option], false)}
              color="primary"
              data-testid={`checkbox-filter-${key}-${option}`}
              onChange={e => onChange(e.target.checked, { key, option })}
            />
          }
          label={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Typography type="style-5" color="highEmphasis">
              {mapper
                ? mapper[`${option}`]
                : formatMessage(
                    intl,
                    `${localizeOptionsKeyPrefix}.${key}.${option}`,
                    `${sentenceCase(option)}`,
                  )}
            </Typography>
          }
        />
      </MenuItem>
    ));
  };

  const renderOptions = (key, sectionOptions) => {
    return sectionOptions.map(({ type, filterOptions, mapper }) => {
      if (type === FILTER_ITEM_TYPE.TITLE) {
        return renderOptionTitle(key);
      }
      if (type === FILTER_ITEM_TYPE.DIVIDER) {
        return <Divider className={classes.sectionDivider} />;
      }
      return renderOptionItems(key, filterOptions, mapper);
    });
  };

  const renderOptionList = () => {
    return Object.keys(options).map(optionKey => {
      const sectionOptions = [
        {
          type: FILTER_ITEM_TYPE.TITLE,
          label: optionKey,
        },
        {
          type: FILTER_ITEM_TYPE.ITEM,
          filterOptions: options[optionKey],
          mapper: mappers[optionKey],
        },
        {
          type: FILTER_ITEM_TYPE.DIVIDER,
        },
      ];

      return renderOptions(optionKey, sectionOptions);
    });
  };
  return (
    <Card
      classes={{ root: classes.container }}
      implementation="css"
      xsUp={!open}
      component={Hidden}
    >
      <Box className={classes.listContainer}>
        <MenuList>{renderOptionList()}</MenuList>
      </Box>
      <Divider />
      <Box pt={4} pr={4} pl={4}>
        <ButtonGroup inverse>
          <TrackingButton
            variant="contained"
            color="primary"
            onClick={onApply}
            data-testid="btn-apply-filter"
            trackingData={{
              category: CATEGORIES.CLAIMS_PAGE,
              action: 'Filter search',
            }}
          >
            {formatMessage(
              intl,
              `${localizeOptionsKeyPrefix}.btn.apply`,
              'Apply',
            )}
          </TrackingButton>
          <TrackingButton
            variant="outlined"
            color="secondary"
            onClick={onClearAll}
            data-testid="btn-clear-all-filter"
            trackingData={{
              category: CATEGORIES.CLAIMS_PAGE,
              action: 'Clear all filters',
            }}
          >
            {formatMessage(
              intl,
              `${localizeOptionsKeyPrefix}.btn.clearAll`,
              'Clear all',
            )}
          </TrackingButton>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

FilterOptions.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    listContainer: PropTypes.string.isRequired,
    optionTitle: PropTypes.string.isRequired,
    sectionDivider: PropTypes.string.isRequired,
  }).isRequired,
  options: PropTypes.shape({}).isRequired,
  mappers: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  filters: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  localizeOptionsKeyPrefix: PropTypes.string.isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(FilterOptions);
