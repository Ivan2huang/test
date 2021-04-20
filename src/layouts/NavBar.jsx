/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'next/router';

import { Tabs, Hidden, Tooltip, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import TrackingTab from '../uiComponents/TrackingTab';
import paths from '../helpers/paths';
import NAV_TABS from './navTabs';
import { navigateTo, convertObjectToParam } from '../helpers/helpers';
import { CATEGORIES } from '../constants/analytics';

const styles = ({
  headerNavLink,
  headerNavLinkActive,
  disabled,
  white,
  spacingX,
}) => ({
  flexContainer: {
    height: spacingX(20),
    paddingRight: spacingX(10),
  },
  tabRoot: {
    marginLeft: spacingX(13),
    color: headerNavLink || disabled,
    fontSize: '14px',
    fontWeight: 400,

    '&$selected': {
      fontWeight: 400,
      color: headerNavLinkActive || white,
    },
  },
  selected: {},
});

const getTooltips = (intl, nav) => (
  <Tooltip title={nav.displayName} placement="bottom-end">
    <span>
      {intl.formatMessage({
        id: `nav-${nav.name}`,
        defaultMessage: nav.displayName,
      })}
    </span>
  </Tooltip>
);

const NavBar = ({ router, classes, intl }) => {
  const selectedTabIndex = NAV_TABS.findIndex(tab =>
    router.pathname.startsWith(paths.common[tab.name]),
  );

  const setSelectedTab = (_, newSelectedTabIndex) => {
    const tab = NAV_TABS[newSelectedTabIndex];
    let params;
    if (tab.getParams) {
      params = tab.getParams();
    }
    if (tab.externalUrl) {
      window.open(
        `${tab.externalUrl}?${convertObjectToParam(params)}`,
        '_self',
      );
    } else {
      navigateTo(paths.common[tab.name], params);
    }
  };

  return (
    <Hidden implementation="css" xsDown>
      <Tabs
        value={selectedTabIndex}
        onChange={setSelectedTab}
        indicatorColor="primary"
        classes={{
          flexContainer: classes.flexContainer,
        }}
      >
        {NAV_TABS.map(nav => (
          <TrackingTab
            disableRipple
            disableFocusRipple
            key={`nav-nav-${nav.name}`}
            data-testid={`nav-${nav.name}`}
            label={getTooltips(intl, nav)}
            classes={{ root: classes.tabRoot, selected: classes.selected }}
            trackingData={{
              category: CATEGORIES.NAVIGATION_BAR,
              action: nav.trackingName,
            }}
          />
        ))}
      </Tabs>
    </Hidden>
  );
};

NavBar.propTypes = {
  router: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    flexContainer: PropTypes.string.isRequired,
    tabRoot: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withRouter,
  withStyles(styles),
)(NavBar);
