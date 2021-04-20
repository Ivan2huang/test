import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../../personal-email/Layout';
import RequestForm from './RequestForm';

const UpdateMobileNumber = ({ profile, changeMobileNumber }) => {
  return (
    <Layout>
      <RequestForm profile={profile} changeMobileNumber={changeMobileNumber} />
    </Layout>
  );
};

UpdateMobileNumber.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  changeMobileNumber: PropTypes.func.isRequired,
};

export default UpdateMobileNumber;
