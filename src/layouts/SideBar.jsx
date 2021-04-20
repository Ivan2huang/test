import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Box, Hidden, Tabs, Tooltip, withStyles } from '@material-ui/core';
import Typography from '../uiComponents/Typography';
import TrackingTab from '../uiComponents/TrackingTab';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  tabsRoot: {
    [theme.breakpoints.only('xs')]: {
      marginLeft: theme.spacingX(-8),
      marginRight: theme.spacingX(-8),
      background: theme.white,
    },
    [theme.breakpoints.only('sm')]: {
      marginLeft: theme.spacingX(-16),
      marginRight: theme.spacingX(-16),
      background: theme.white,
    },
  },
  tabsFlexContainer: {
    [`@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)`]: {
      margin: '1px 2px 1px 1px',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
    },
  },
  selected: {
    '&& *': {
      color: theme.grey3,
    },
  },
  tabRoot: {
    textTransform: 'none',
    minHeight: theme.spacingX(13),
    paddingTop: '0',
    marginRight: theme.spacingX(6),
    opacity: 1,
    [theme.breakpoints.up('md')]: {
      borderBottom: 'none',
      minHeight: theme.spacingX(14),
      marginRight: 0,
    },
    '&:hover, &:focus': {
      [theme.breakpoints.up('md')]: {
        paddingTop: 'none',
        borderBottom: 'none',
      },
    },
    '&:hover': {
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.grey1,
      },
    },
    '&$selected': {
      [theme.breakpoints.up('md')]: {
        borderBottom: 'none',
      },
    },
    '&:first-child': {
      [theme.breakpoints.only('xs')]: {
        marginLeft: theme.spacingX(8),
      },
      [theme.breakpoints.only('sm')]: {
        marginLeft: theme.spacingX(16),
      },
    },
  },
  tabTextStyle: {
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacingX(6),
    },
  },
  tabWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacingX(3),
      justifyContent: 'flex-start',
    },
    '&&& .MuiSvgIcon-root': {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'inline-block',
        marginBottom: '0',
      },
    },
  },
  tabLabelText: {
    textAlign: 'left',
    color: theme.black,
    [theme.breakpoints.up('md')]: {
      ...theme.typography['style-6'],
    },
  },
});

const Label = ({ name, tabTextStyle, tabLabelText }) => (
  <Tooltip title={name} placement="bottom-end">
    <Box classes={{ root: tabTextStyle }}>
      <Typography type="style-8" classes={{ root: tabLabelText }}>
        {name}
      </Typography>
    </Box>
  </Tooltip>
);

Label.propTypes = {
  name: PropTypes.string.isRequired,
  tabTextStyle: PropTypes.string.isRequired,
  tabLabelText: PropTypes.string.isRequired,
};

const SideBar = ({
  intl,
  active,
  items,
  classes,
  handleChange,
  isMobileOnly,
  labelPrefix,
}) => {
  const {
    selected,
    tabTextStyle,
    tabLabelText,
    tabWrapper: wrapper,
    tabsFlexContainer: flexContainer,
  } = classes;

  const tabsCls = {
    flexContainer,
    root: classes.tabsRoot,
  };

  const tabCls = {
    selected,
    wrapper,
    root: classes.tabRoot,
  };

  const renderSidebar = () => (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      value={active}
      onChange={(evt, tabKey) => {
        handleChange(tabKey);
      }}
      classes={tabsCls}
    >
      {items.map(
        ({ id, name, icon, activeIcon, suffix, trackingData = null }) => {
          const label = (
            <>
              <Hidden implementation="css" smDown>
                <Label
                  name={intl.formatMessage({
                    id: `${labelPrefix}${id}`,
                    defaultMessage: name,
                  })}
                  tabTextStyle={tabTextStyle}
                  tabLabelText={tabLabelText}
                />
              </Hidden>

              <Hidden implementation="css" mdUp>
                <Label
                  name={intl.formatMessage({
                    id: `${labelPrefix}${id}${suffix || ''}`,
                    defaultMessage: name,
                  })}
                  tabTextStyle={tabTextStyle}
                  tabLabelText={tabLabelText}
                />
              </Hidden>
            </>
          );

          return (
            <TrackingTab
              data-testid={id}
              key={id}
              label={label}
              icon={id === active ? activeIcon : icon}
              classes={tabCls}
              value={id}
              disableRipple
              disableFocusRipple
              trackingData={trackingData}
            />
          );
        },
      )}
    </Tabs>
  );

  return (
    <>
      {isMobileOnly ? <Hidden mdUp>{renderSidebar()}</Hidden> : renderSidebar()}
    </>
  );
};

SideBar.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  active: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  isMobileOnly: PropTypes.bool,
  labelPrefix: PropTypes.string.isRequired,
};

SideBar.defaultProps = {
  items: [],
  isMobileOnly: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(SideBar);
