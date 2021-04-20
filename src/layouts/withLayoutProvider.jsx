import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';

const defaultOptions = {
  backgroundImage: '',
  fullWidth: false,
};

const withLayout = (WrappedComponent, options = { ...defaultOptions }) => ({
  ...rest
}) => {
  return (
    <Layout WrappedComponent={WrappedComponent} options={options} {...rest} />
  );
};

withLayout.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
  options: PropTypes.exact({
    backgroundImage: PropTypes.string,
    fullWidth: PropTypes.bool,
  }),
};

export default withLayout;
