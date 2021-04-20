/* eslint-disable import/prefer-default-export */

import { useMediaQuery, useTheme } from '@material-ui/core';

export const useBreakpoint = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key), {
        defaultMatches: true,
      });
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};
