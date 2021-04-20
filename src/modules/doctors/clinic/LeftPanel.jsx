/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, Link, Hidden, withStyles } from '@material-ui/core';

import { VIEW } from './constants';
import ClinicListViewContainer from './ClinicListViewContainer';
import ClinicDetailViewContainer from './ClinicDetailViewContainer';
import ClinicSearchContainer from './ClinicSearchContainer';
import ClinicFilterContainer from './ClinicFilterContainer';
import { formatMessage } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';

const styles = theme => ({
  sideBar: {
    minWidth: '100%',
    maxHeight: '100%',
    boxShadow: `0px 1px 0px ${theme.grey1}`,
    [theme.breakpoints.up('md')]: {
      width: '30%',
      minWidth: theme.spacingX(73),
    },
  },
  searchField: {
    boxShadow: `0 1px 0 ${theme.grey1}`,
    marginBottom: '1px',
    background: theme.white,
    paddingLeft: theme.spacingX(8),
    paddingRight: theme.spacingX(8),
    paddingTop: theme.spacingX(6),
    paddingBottom: theme.spacingX(6),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
      background: theme.transparent,
    },
  },
  listViewContainer: {
    background: theme.background,
    display: 'flex',
    flex: 1,
    overflowY: 'auto',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      marginLeft: `-${theme.spacingX(8)}`,
      marginRight: `-${theme.spacingX(8)}`,
    },
  },
  filterWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',

      '& > div:first-child': {
        flex: 1,
      },

      '& > div:last-child': {
        marginLeft: theme.spacingX(5),
      },
    },
  },
});

const LeftPanel = ({ intl, classes, view, toggleView }) => {
  const nextView = () => (view === VIEW.list ? VIEW.map : VIEW.list);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.sideBar}
      height={view === VIEW.list ? '100%' : 'auto'}
    >
      <Box className={classes.searchField}>
        <ClinicSearchContainer open={isSearchOpen} setOpen={setIsSearchOpen} />
        <div className={classes.filterWrapper}>
          <ClinicFilterContainer
            open={isFilterOpen}
            setOpen={setIsFilterOpen}
            closeSearchPopup={() => setIsSearchOpen(false)}
          />
          <Box
            mt={5}
            display="flex"
            justifyContent="flex-end"
            implementation="css"
            mdUp
            component={Hidden}
          >
            <Link
              data-testid="btn-toggle-view"
              underline="none"
              component="button"
              onClick={toggleView}
            >
              <Typography type="style-6" color="hyperlink">
                {formatMessage(
                  intl,
                  'clinic.searchClinics.toggleView',
                  `View ${nextView()}`,
                  {
                    view: nextView(),
                  },
                )}
              </Typography>
            </Link>
          </Box>
        </div>
      </Box>
      <Box className={classes.listViewContainer}>
        <ClinicListViewContainer
          closeFilterPopup={() => setIsFilterOpen(false)}
        />

        <ClinicDetailViewContainer />
      </Box>
    </Box>
  );
};

LeftPanel.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    sideBar: PropTypes.string.isRequired,
    searchField: PropTypes.string.isRequired,
    listViewContainer: PropTypes.string.isRequired,
    filterWrapper: PropTypes.string.isRequired,
  }).isRequired,
  view: PropTypes.string.isRequired,
  toggleView: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(styles)(LeftPanel));
