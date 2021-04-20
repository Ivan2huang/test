import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from '../../../helpers/helpers';
import {
  BENEFITS_PATHNAME,
  HEALTHCARDS_PATHNAME,
  TERMINATED,
} from '../constant';

const Auth = ({ memberProfile, hasEHealthCard }) => {
  useEffect(() => {
    if (memberProfile.status === TERMINATED || !hasEHealthCard) {
      navigateTo(BENEFITS_PATHNAME);
    } else {
      navigateTo(HEALTHCARDS_PATHNAME);
    }
  }, []);
  return <></>;
};

Auth.propTypes = {
  memberProfile: PropTypes.shape({}).isRequired,
  hasEHealthCard: PropTypes.bool.isRequired,
};

export default Auth;
