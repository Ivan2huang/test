import React from 'react';
import { useTheme } from '@material-ui/core';
import Table from './Table';

const TableContainer = props => {
  const theme = useTheme();
  return (
    <Table
      customStyles={{
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: `1px solid ${theme.grey1}`,
        headerBackground: 'none',
        headerTextType: 'style-8',
      }}
      {...props}
    />
  );
};

export default TableContainer;
