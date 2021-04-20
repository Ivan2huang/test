import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import withLayout from '../../layouts/withLayoutProvider';
import LifestyleOverview from './LifestyleOverview';
import LifestyleLanding from './LifestyleLanding';

const LoadingLayout = withLayout(() => {
  return <Box my={20} />;
});

const Lifestyle = ({ lifestyleDetails, getLifestyleDetails, loading }) => {
  useEffect(() => {
    getLifestyleDetails();
  }, []);

  console.log('Lifestyle.jsx render lifestyleDetails=', lifestyleDetails);
  if (loading) {
    return <LoadingLayout />;
  }

  return <>{lifestyleDetails ? <LifestyleOverview /> : <LifestyleLanding />}</>;
};

Lifestyle.defaultProps = {
  lifestyleDetails: null,
  loading: false,
};

Lifestyle.propTypes = {
  lifestyleDetails: PropTypes.shape({}),
  getLifestyleDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default Lifestyle;
