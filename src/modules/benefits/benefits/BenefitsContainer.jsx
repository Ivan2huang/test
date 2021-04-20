import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Benefits from './Benefits';
import BenefitsRoot from '../BenefitsContainer';
import { BENEFITS_ID } from '../constant';
import { getMemberProfileWithMembershipNumber } from '../../me/action';
import { getWalletBalance as getWalletBalanceAction } from '../../claims/make-claim/action';
import { loaderDetail } from '../../loader/util';
import LOADER from '../../../constants/loader';

const mapStateToProps = ({ me, claim, benefits, loader }) => {
  const { member } = me;
  const { makeClaim } = claim;
  const { walletBalance } = makeClaim;

  return {
    memberProfile: member.profile,
    memberToWalletBalanceMap: walletBalance.memberToWalletBalanceTextMap,
    isWalletsDisabled: benefits.wallets.isWalletsDisabled,
    ...loaderDetail(loader, LOADER.page),
  };
};

const mapDispatchToProps = {
  getMemberProfile: getMemberProfileWithMembershipNumber,
  getWalletBalance: getWalletBalanceAction,
};

const BenefitsContainer = ({ getMemberProfile, getWalletBalance, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getWalletBalance();
    getMemberProfile();
    setIsLoaded(true);
  }, []);

  return (
    <BenefitsRoot active={BENEFITS_ID} isLoaded={isLoaded}>
      <Benefits {...rest} />
    </BenefitsRoot>
  );
};

BenefitsContainer.propTypes = {
  getMemberProfile: PropTypes.func.isRequired,
  getWalletBalance: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenefitsContainer);
