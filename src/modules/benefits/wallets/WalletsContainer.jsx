import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wallets from './Wallets';
import Benefits from '../BenefitsContainer';
import { E_WALLET_ID } from '../constant';
import { getWallets as getWalletsAction } from './action';
import { walletsSelector, roleSelector } from './selector';
import { IsEmployee } from '../../../helpers/roles';

const mapStateToProps = state => ({
  wallets: walletsSelector(state),
  role: roleSelector(state),
});

const mapDispatchToProps = {
  getWallets: getWalletsAction,
};

const WalletsContainer = ({ getWallets, wallets, role, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const includeDependents = IsEmployee(role);
    getWallets(includeDependents);
    setIsLoaded(true);
  }, []);

  return (
    <Benefits active={E_WALLET_ID} isLoaded={isLoaded}>
      <Wallets wallets={wallets} {...rest} />
    </Benefits>
  );
};

WalletsContainer.propTypes = {
  wallets: PropTypes.shape().isRequired,
  role: PropTypes.string.isRequired,
  getWallets: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletsContainer);
