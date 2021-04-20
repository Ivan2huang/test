import React from 'react';
import * as PropTypes from 'prop-types';
import { Divider, Hidden, makeStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import GridItem from '../../../uiComponents/GridItem';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginTop: theme.spacingX(5),

    '& svg': {
      marginRight: theme.spacingX(4),
    },
  },

  divider: {
    marginTop: theme.spacingX(4),
  },
}));

const ContactItem = ({
  onClick,
  icon,
  href,
  display,
  classeName,
  tracking: { action, category },
}) => {
  const classes = useStyles();

  return (
    <GridItem columns={{ xs: 12, md: 12 }}>
      <div className={classes.container}>
        {icon}
        <Typography
          type="style-6"
          component="a"
          onClick={onClick}
          href={href}
          className={classeName}
          data-category={category}
          data-action={action}
        >
          {display}
        </Typography>
      </div>
      <Hidden smUp>
        <Divider className={classes.divider} />
      </Hidden>
    </GridItem>
  );
};

ContactItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  classeName: PropTypes.string.isRequired,
  tracking: PropTypes.shape({
    action: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
