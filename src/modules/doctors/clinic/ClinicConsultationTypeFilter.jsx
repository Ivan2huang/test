/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import {
  Card,
  Box,
  Button,
  Hidden,
  MenuItem,
  MenuList,
  withStyles,
  Divider,
} from '@material-ui/core';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '../../../uiComponents/Typography';
import ButtonGroup from '../../../uiComponents/ButtonGroup';
import { sentenceCase, formatMessage } from '../../../helpers/helpers';

const Styles = theme => ({
  root: {
    margin: '0px',
    width: '100%',
  },
  container: {
    position: 'absolute',
    zIndex: 1000,
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
  listContainer: {
    maxHeight: 'calc(50vh - 72px)',
    overflowY: 'auto',
  },
});

const ClinicConsultationTypeFilter = ({
  intl,
  classes,
  consultationTypes,
  open,
  onChange,
  filters,
  onApply,
  onClearAll,
}) => {
  const renderCheckBoxs = () => {
    return (
      <Box>
        {consultationTypes.map((consultationType, index) => (
          <MenuItem key={`${consultationType.keyword}-${index}`} disableGutters>
            {/* <Typography type="style-5">{consultationType}</Typography> */}
            <FormControlLabel
              className={classes.root}
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox
                  value={consultationType}
                  checked={!!filters[consultationType]}
                  color="primary"
                  data-testid={`checkbox-filter-${index}`}
                  onChange={e => onChange(e.target.checked, consultationType)}
                />
              }
              label={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Typography fontWeight="normal" color="mediumEmphasis">
                  {sentenceCase(consultationType)}
                </Typography>
              }
            />
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
      <Box className={classes.listContainer}>
        <MenuList>{renderCheckBoxs()}</MenuList>
      </Box>
      <Divider />
      <Box pt={4} pr={4} pl={4}>
        <ButtonGroup inverse>
          <Button
            variant="contained"
            color="primary"
            onClick={onApply}
            data-testid="btn-apply-filter"
          >
            {formatMessage(intl, 'clinic.filter.btn.apply', 'Apply')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClearAll}
            data-testid="btn-clear-all-filter"
          >
            {formatMessage(intl, 'clinic.filter.btn.clearAll', 'Clear all')}
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  );
};

ClinicConsultationTypeFilter.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
  }).isRequired,
  consultationTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  filters: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(ClinicConsultationTypeFilter);
