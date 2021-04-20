import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import {
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
  withStyles,
} from '@material-ui/core';

import paths from '../helpers/paths';
import { navigateTo } from '../helpers/helpers';
import NAV_TABS from './navTabs';
import { logAction } from '../helpers/firebase';
import { CATEGORIES } from '../constants/analytics';

const styles = theme => ({
  root: {
    width: 'auto',
    boxShadow: `0 -1px 0 ${theme.grey1}`,
    zIndex: 1000,
    position: 'fixed',
    bottom: 0,
    overflowX: 'auto',
  },
  NavLabel: {
    marginTop: theme.spacingX(1),
    ...theme.typography['style-8'],

    '&.Mui-selected': {
      fontSize: theme.typography['style-8'].fontSize,
      color: theme.activatedIcon,
    },
  },
});

const BottomNavBar = ({ router, classes, intl }) => {
  const selectedTabIndex = NAV_TABS.findIndex(tab =>
    router.pathname.startsWith(paths.common[tab.name]),
  );

  const setSelectedTab = (_, newSelectedTabIndex) => {
    const currentTab = NAV_TABS[newSelectedTabIndex] || {};
    logAction({
      category: CATEGORIES.NAVIGATION_BAR,
      action: currentTab.trackingName,
    });
    if (currentTab.externalUrl) {
      window.open(currentTab.externalUrl, '_self');
    } else {
      navigateTo(paths.common[currentTab.name]);
    }
  };

  return (
    <Hidden smUp>
      <BottomNavigation
        value={selectedTabIndex}
        onChange={setSelectedTab}
        showLabels
        classes={{ root: classes.root }}
      >
        {NAV_TABS.map((nav, index) => (
          <BottomNavigationAction
            key={`nav-${nav.name}`}
            data-testid={`nav-${nav.name}`}
            label={intl.formatMessage({
              id: `nav-${nav.name}`,
              defaultMessage: nav.displayName,
            })}
            icon={selectedTabIndex === index ? nav.activeIcon : nav.icon}
            classes={{ label: classes.NavLabel }}
          />
        ))}
      </BottomNavigation>
    </Hidden>
  );
};

BottomNavBar.propTypes = {
  router: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    root: PropTypes.string.isRequired,
    NavLabel: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(withRouter(withStyles(styles)(BottomNavBar)));
