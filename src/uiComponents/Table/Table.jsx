import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';

import Typography from '../Typography';
import { onEnter } from '../../helpers/helpers';
import { buildMap } from '../../modules/benefits/benefits/helper';

const useStyles = makeStyles(theme => ({
  tableRowHover: {
    cursor: 'pointer',
    '&:focus': {
      background: theme.grey1,
    },
  },
  tableCellRoot: ({ borderLeft, borderRight, borderBottom }) => ({
    borderLeft,
    borderRight,
    borderBottom,
    verticalAlign: 'top',
    paddingTop: theme.spacingX(3),
    paddingBottom: theme.spacingX(3),
  }),
  tableHeaderCell: ({ borderTop, headerBackground }) => ({
    borderTop,
    background: headerBackground,
  }),
}));

const StyledTable = ({
  columnDefs,
  data,
  hover,
  groupBy,
  onRowClick,
  customStyles,
  rowTabIndex,
}) => {
  const classes = useStyles(customStyles);
  const { headerTextType } = customStyles;
  const groupByKey = groupBy || columnDefs[0].name;
  const map = buildMap(data, groupByKey);
  let previousRenderedRow = '';

  const renderTableHeader = () =>
    columnDefs.map((column, index) => {
      const id = `table-header-${index}`;
      return (
        <TableCell
          key={id}
          align={column.alignContent}
          classes={{
            root: classes.tableCellRoot,
            head: classes.tableHeaderCell,
          }}
        >
          <Typography type={headerTextType}>{column.name}</Typography>
        </TableCell>
      );
    });

  const getTableCell = (key, column, row, rowSpan) => (
    <TableCell
      key={key}
      align={column.alignContent}
      rowSpan={rowSpan}
      classes={{ root: classes.tableCellRoot }}
    >
      <Typography type="style-6">{column.template(row)}</Typography>
    </TableCell>
  );

  const renderTableCells = (row, rowIndex) =>
    columnDefs.map((column, index) => {
      const key = `table-cell-${rowIndex}-${index}`;
      if (column.pivotColumn && row[groupByKey] !== previousRenderedRow) {
        previousRenderedRow = row[groupByKey];
        const withRowSpan = map[row[groupByKey]];
        return getTableCell(key, column, row, withRowSpan);
      }
      if (column.pivotColumn && row[groupByKey] === previousRenderedRow) {
        return undefined;
      }
      return getTableCell(key, column, row);
    });

  const renderTableRows = rows =>
    rows.map((row, rowIndex) => {
      const key = `table-row-${rowIndex}`;
      return (
        <TableRow
          classes={{ hover: classes.tableRowHover }}
          hover={hover}
          onClick={() => onRowClick(row)}
          key={key}
          tabIndex={rowTabIndex}
          onKeyPress={e => onEnter(e, () => onRowClick(row))}
        >
          {renderTableCells(row, rowIndex)}
        </TableRow>
      );
    });

  return (
    <Table>
      <TableHead>
        <TableRow>{renderTableHeader()}</TableRow>
      </TableHead>
      <TableBody>{renderTableRows(data)}</TableBody>
    </Table>
  );
};

StyledTable.defaultProps = {
  hover: false,
  groupBy: undefined,
  onRowClick: () => {},
  customStyles: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    headerBackground: 'none',
    headerTextType: 'style-8',
  },
};

StyledTable.propTypes = {
  columnDefs: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      template: PropTypes.func.isRequired,
      alignContent: PropTypes.string,
      pivotColumn: PropTypes.bool,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hover: PropTypes.bool,
  groupBy: PropTypes.string,
  onRowClick: PropTypes.func,
  customStyles: PropTypes.shape({}),
  rowTabIndex: PropTypes.string,
};

StyledTable.defaultProps = {
  rowTabIndex: '0',
  onRowClick: () => {},
};

export default StyledTable;
