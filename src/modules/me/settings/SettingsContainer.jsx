import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Settings from './Settings';
import { updateSettings as updateSettingsAction } from './action';
import Me from '../MeContainer';
import { SETTINGS_ID } from '../constant';

export const mapStateToProps = ({ me }) => {
  const {
    member: { profile },
  } = me;
  const { isEdmOptedOut = false } = profile;

  return {
    settings: {
      isEdmOptedOut,
    },
  };
};

const mapDispatchToProps = {
  updateSettings: updateSettingsAction,
};

const SettingsContainer = ({ settings, updateSettings }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Me active={SETTINGS_ID} isLoaded={isLoaded}>
      <Settings settings={settings} updateSettings={updateSettings} />
    </Me>
  );
};

SettingsContainer.propTypes = {
  updateSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    isEdmOptedOut: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsContainer);
