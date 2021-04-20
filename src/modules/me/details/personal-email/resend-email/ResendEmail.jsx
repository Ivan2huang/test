import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../Layout';
import ResendForm from './ResendForm';

const ResendEmail = ({
  profile,
  personalEmailStatus: { email },
  changePersonalEmail,
}) => {
  return (
    <Layout>
      <ResendForm
        profile={profile}
        requestedEmail={email}
        changePersonalEmail={changePersonalEmail}
      />
    </Layout>
  );
};

ResendEmail.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  personalEmailStatus: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  changePersonalEmail: PropTypes.func.isRequired,
};

export default ResendEmail;
