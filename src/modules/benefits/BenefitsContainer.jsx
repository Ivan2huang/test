import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Benefits from './Benefits';

const MeContainer = ({ memberProfile, ...rest }) => {
  return <Benefits memberProfile={memberProfile} {...rest} />;
};

MeContainer.propTypes = {
  memberProfile: PropTypes.shape().isRequired,
  isWalletsDisabled: PropTypes.bool.isRequired,
};

export const mapStateToProps = ({ me, benefits }) => ({
  memberProfile: me.member.profile,
  isWalletsDisabled: benefits.wallets.isWalletsDisabled,
  hasEHealthCard: benefits.benefitStatus.hasEHealthCard,
});

export default connect(mapStateToProps)(MeContainer);
