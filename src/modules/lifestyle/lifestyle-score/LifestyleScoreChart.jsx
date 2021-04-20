import React from 'react';
import * as PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core';

import { LifestyleScoreBar } from '../../../icons';

const LifestyleScoreChart = ({ theme, healthScore }) => {
  const defaultProps = {
    leftFill: theme.grey1,
    topFill: theme.grey1,
    rightFill: theme.grey1,
  };
  let props = defaultProps;
  if (healthScore >= 0 && healthScore <= 25) {
    props = { ...defaultProps, leftFill: theme.primary };
  } else if (healthScore > 25 && healthScore <= 75) {
    props = { ...defaultProps, topFill: theme.warning };
  } else if (healthScore > 75 && healthScore <= 100) {
    props = { ...defaultProps, rightFill: theme.success };
  }

  return <LifestyleScoreBar {...props} />;
};

LifestyleScoreChart.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  healthScore: PropTypes.number,
};

LifestyleScoreChart.defaultProps = {
  healthScore: null,
};

export default withTheme(LifestyleScoreChart);
