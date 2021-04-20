import React from 'react';
import PropTypes from 'prop-types';

import { Grid as MaterialGrid } from '@material-ui/core';

import { useBreakpoint } from '../helpers/mui';

const GRID_SPACING = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 6,
};

const Grid = ({ className, children, spacing, alignItems, justify }) => {
  const breakpoint = useBreakpoint();
  const gridSpacing = spacing || GRID_SPACING[breakpoint];

  return (
    <MaterialGrid
      container
      spacing={gridSpacing}
      alignItems={alignItems}
      justify={justify}
      classes={{ root: className }}
    >
      {children}
    </MaterialGrid>
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
  alignItems: PropTypes.string,
  justify: PropTypes.string,
};

Grid.defaultProps = {
  className: '',
  spacing: undefined,
  alignItems: 'stretch',
  justify: 'flex-start',
};

export default Grid;
