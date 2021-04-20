import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';

import { NOTIFICATION_TYPES } from '../../constants/types';

const useStyles = makeStyles(theme => ({
  container: ({ type }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacingX(4),
    borderStyle: 'solid',
    borderColor: theme[`notifyBorder${type}`],
    background: theme[`notifyBackground${type}`],
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    borderRadius: theme.borderRadiusX(1),
  }),
}));

const NotificationBox = ({ type, children, className }) => {
  const classes = useStyles({ type });
  return <Box className={`${classes.container} ${className}`}>{children}</Box>;
};

NotificationBox.defaultProps = {
  type: NOTIFICATION_TYPES.WARNING,
  className: '',
};

NotificationBox.propTypes = {
  type: PropTypes.oneOf([
    NOTIFICATION_TYPES.ERROR,
    NOTIFICATION_TYPES.WARNING,
    NOTIFICATION_TYPES.SUCCESS,
  ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default NotificationBox;
