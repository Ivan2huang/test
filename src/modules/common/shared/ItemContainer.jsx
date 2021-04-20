/* eslint-disable no-plusplus */
import React from 'react';
import * as PropTypes from 'prop-types';

import { Box, withTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const getGridColumnIndex = (itemIndex, gridColumns) => {
  return (2 * itemIndex - 1) % gridColumns;
};

const getGridRowIndex = (itemIndex, numberOfColumns) => {
  return 2 * Math.ceil(itemIndex / numberOfColumns) - 1;
};

const getStyles = props => {
  const { theme, itemLength, numberOfColumns } = props;
  const gridColumnCss = {};
  const gridColumns = numberOfColumns * 2;
  const numberOfRows = Math.ceil(itemLength / numberOfColumns);

  for (let itemIndex = 1; itemIndex <= itemLength; itemIndex++) {
    gridColumnCss[`& > *:nth-child(${itemIndex})`] = {
      '-ms-grid-column': getGridColumnIndex(itemIndex, gridColumns),
      '-ms-grid-row': getGridRowIndex(itemIndex, numberOfColumns),
    };
  }

  return {
    display: 'grid',
    maxWidth: '100%',
    width: '100%',
    gridGap: '16px',
    gridAutoRows: '1fr',
    gridTemplateColumns: 'repeat(1, 1fr)',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
      '-ms-grid-columns': `1fr (16px 1fr)[${numberOfColumns - 1}]`,
      '-ms-grid-rows': `1fr (16px 1fr)[${numberOfRows - 1}]`,
      ...gridColumnCss,
    },
  };
};

const ItemContainer = ({ children, theme, itemLength, numberOfColumns }) => {
  const useStyles = makeStyles({
    root: getStyles,
  });
  const classes = useStyles({ theme, itemLength, numberOfColumns });
  return <Box className={classes.root}>{children}</Box>;
};

ItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}).isRequired,
  itemLength: PropTypes.number.isRequired,
  numberOfColumns: PropTypes.number.isRequired,
};

export default withTheme(ItemContainer);
