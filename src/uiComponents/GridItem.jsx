import React from 'react';
import PropTypes from 'prop-types';

import { Grid as MaterialGrid } from '@material-ui/core';

import { useBreakpoint } from '../helpers/mui';

const GridItem = ({ className, children, offset, columns }) => {
  const newOffset = { ...offset };
  const newColumns = { ...columns };
  if (offset.md) {
    newOffset.lg = offset.md;
  }
  if (columns.md) {
    newColumns.lg = columns.md;
  }
  const breakpoint = useBreakpoint();
  const props = {
    [breakpoint]: newColumns[breakpoint],
  };
  const offsetProps = {
    [breakpoint]: newOffset[breakpoint],
  };
  const gridItem = (
    <MaterialGrid item {...props} classes={{ root: className }}>
      {children}
    </MaterialGrid>
  );

  if (!props[breakpoint]) return <></>;

  if (newOffset[breakpoint])
    return (
      <>
        <MaterialGrid item {...offsetProps} classes={{ root: className }} />
        {gridItem}
      </>
    );

  return gridItem;
};

GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  offset: PropTypes.exact({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
  }),
  columns: PropTypes.exact({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
  }).isRequired,
};

GridItem.defaultProps = {
  className: '',
  offset: {},
};

export default GridItem;
