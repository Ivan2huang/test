import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { stopSubmit } from 'redux-form';

import InviteDependent from './InviteDependent';
import { inviteDependent } from './action';
import ERROR from '../../../../constants/error';

export const mapStateToProps = (state, ownProps) => {
  const { memberId } = ownProps.router.query;
  const {
    me: {
      member: {
        profile: { relationships },
      },
    },
  } = state;
  const emailAlreadyTaken =
    state.error[ERROR.inviteDependent.emailAlreadyTaken];
  const {
    fullName,
    email,
    dateOfBirth,
    relationshipToEmployee,
    relationshipCategory,
  } = relationships.find(m => m.memberId === memberId);
  let submissionErrors = {};
  if (state.form.inviteDependent && state.form.inviteDependent.submitErrors) {
    submissionErrors = state.form.inviteDependent.submitErrors;
  }

  return {
    memberId,
    dependentName: fullName,
    relationship: relationshipToEmployee,
    relationshipCategory,
    emailAlreadyTaken,
    hasDefaultDateOfBirth: dateOfBirth != null,
    submissionErrors,
    initialValues: {
      dateOfBirth,
      dependentEmail: email,
    },
  };
};

export const mapDispatchToProps = dispatch => ({
  inviteDependentAction: (dependentData, loaderMessage) =>
    dispatch(inviteDependent(dependentData, loaderMessage)),
  setFormErrorIfEamilAlreadyTaken: ({ formName, fieldName, errorMessage }) =>
    dispatch(stopSubmit(formName, { [fieldName]: errorMessage })),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(InviteDependent);
