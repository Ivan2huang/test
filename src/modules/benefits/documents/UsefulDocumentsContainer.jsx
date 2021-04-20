import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsefulDocuments from './UsefulDocuments';
import { getUsefulDocuments as getUsefulDocumentsAction } from './action';
import Benefits from '../BenefitsContainer';
import { DOCUMENTS_ID } from '../constant';

const mapStateToProps = ({ benefits }) => ({
  usefulDocuments: benefits.documents.usefulDocuments,
});

const mapDispatchToProps = {
  getUsefulDocuments: getUsefulDocumentsAction,
};

const UsefulDocumentsContainer = ({ getUsefulDocuments, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUsefulDocuments();
    setIsLoaded(true);
  }, []);

  return (
    <Benefits active={DOCUMENTS_ID} isLoaded={isLoaded}>
      <UsefulDocuments {...rest} />
    </Benefits>
  );
};

UsefulDocumentsContainer.propTypes = {
  getUsefulDocuments: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsefulDocumentsContainer);
