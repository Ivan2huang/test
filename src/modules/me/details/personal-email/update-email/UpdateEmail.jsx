import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../Layout';
import RequestForm from './RequestForm';

const UpdateEmail = ({ profile, changePersonalEmail }) => {
  return (
    <Layout>
      <RequestForm
        profile={profile}
        changePersonalEmail={changePersonalEmail}
      />
    </Layout>
  );
};

UpdateEmail.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  changePersonalEmail: PropTypes.func.isRequired,
};

export default UpdateEmail;
