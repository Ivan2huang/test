import React from 'react';
import { useTheme } from '@material-ui/core';
import Table from './Table';

const TableContainer = props => {
  const theme = useTheme();
  return (
    <Table
      customStyles={{
        borderTop: `1px solid ${theme.disabled}`,
        borderLeft: `1px solid ${theme.disabled}`,
        borderRight: `1px solid ${theme.disabled}`,
        borderBottom: `1px solid ${theme.disabled}`,
        headerBackground: theme.grey1,
        headerTextType: 'style-6',
      }}
      {...props}
    />
  );
};

export default TableContainer;
