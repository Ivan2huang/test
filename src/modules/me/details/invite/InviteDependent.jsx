import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Box, Card, CardContent, withStyles, Hidden } from '@material-ui/core';
import TrackingButton from '../../../../uiComponents/TrackingButton';
import Grid from '../../../../uiComponents/Grid';
import GridItem from '../../../../uiComponents/GridItem';
import Typography from '../../../../uiComponents/Typography';
import ButtonGroup from '../../../../uiComponents/ButtonGroup';
import NavigationBackButton from '../../../../uiComponents/NavigationBackButton';
import renderTextField from '../../../../utils/renderTextField';
import { formatMessage, navigateTo } from '../../../../helpers/helpers';
import Images from '../../../../constants/images';
import {
  validateEmail,
  validateRequired,
  validateEmailsMatch,
  validateDateOfBirth,
} from './validation';
import renderDatePicker from '../../../../utils/renderDatePicker';
import paths from '../../../../helpers/paths';
import { DETAILS_ID } from '../../constant';
import { CATEGORIES } from '../../../../constants/analytics';

const Styles = () => ({
  image: {
    width: '100%',
  },
});

const InviteDependent = ({
  intl,
  handleSubmit,
  change,
  dependentName,
  emailAlreadyTaken,
  hasDefaultDateOfBirth,
  submissionErrors,
  setFormErrorIfEamilAlreadyTaken,
}) => {
  useEffect(() => {
    if (emailAlreadyTaken && emailAlreadyTaken.errorState) {
      setFormErrorIfEamilAlreadyTaken({
        formName: 'inviteDependent',
        fieldName: 'dependentEmail',
        errorMessage: formatMessage(
          intl,
          'me.tabs.myDetails.invite.dependent.validations.accountAlreadyInUse',
          'Email already exist. Try a new email address',
        ),
      });
    }
  }, [emailAlreadyTaken]);

  const onDateOfBirthChange = date => {
    change('inviteDependent.dateOfBirthInput', date);
  };

  const DateOfBirthMaximum = () => {
    return new Date();
  };

  const DateOfBirthMinimum = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 110);
    return date;
  };

  const navigateToMyDetails = () => navigateTo(paths.common[DETAILS_ID]);

  return (
    <Box
      mt={{
        xs: 3,
        sm: 3,
      }}
    >
      <NavigationBackButton
        testId="btn-back-mydetails-inviteDependent"
        onClick={navigateToMyDetails}
      >
        {formatMessage(
          intl,
          'me.tabs.myDetails.invite.dependent.button.backToMyDetails',
          '< My details',
        )}
      </NavigationBackButton>
      <Card>
        <CardContent>
          <Box mt={{ xs: 0, md: 10 }} mb={10}>
            <Grid>
              <GridItem offset={{ md: 1 }} columns={{ md: 3 }}>
                <Box mb={4} mt={{ md: 5 }}>
                  <img src={Images.INVITE_DEPENDENT} alt="background" />
                </Box>
              </GridItem>
              <GridItem
                offset={{ sm: 1, md: 1 }}
                columns={{ xs: 12, sm: 10, md: 5 }}
              >
                <Hidden implementation="css" smUp>
                  <Box mb={4}>
                    <Typography type="style-2">
                      {formatMessage(
                        intl,
                        'me.tabs.myDetails.invite.dependent.header.title.sm',
                        'My details',
                      )}
                    </Typography>
                  </Box>
                </Hidden>
                <Hidden implementation="css" smDown>
                  <Box mb={4}>
                    <Typography type="style-1">
                      {formatMessage(
                        intl,
                        'me.tabs.myDetails.invite.dependent.header.title',
                        'Invite',
                        { dependentName },
                      )}
                    </Typography>
                  </Box>
                </Hidden>
                <Box mb={8}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'me.tabs.myDetails.invite.dependent.instructionsFirst',
                      'Invite dependents to HSBC Benefits so they can access the dependent app and website.',
                    )}
                  </Typography>
                </Box>
                <Box mb={8}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,

                      'me.tabs.myDetails.invite.dependent.instructionsSecond',
                      "Provide dependent's email address and he/she will receive instructions to create a dependent account.",
                      { dependentName },
                    )}
                  </Typography>
                </Box>
                <Box mb={8}>
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <Box mt={4} mb={6}>
                      <Field
                        name="dateOfBirth"
                        label={formatMessage(
                          intl,
                          'me.tabs.myDetails.invite.dependent.label.dateOfBirth',
                          'Date of birth',
                        )}
                        errorMessage={
                          submissionErrors && submissionErrors.dateOfBirth
                            ? submissionErrors.dateOfBirth
                            : formatMessage(
                                intl,
                                'dateofBirth.validations.required',
                                'Enter date of birth',
                              )
                        }
                        testId="dependent-invite-dateofbirth"
                        minDate={DateOfBirthMinimum()}
                        maxDate={DateOfBirthMaximum()}
                        onChange={onDateOfBirthChange}
                        disabled={hasDefaultDateOfBirth}
                        component={renderDatePicker}
                        validate={[validateRequired]}
                      />
                      <Field
                        name="dependentEmail"
                        label={formatMessage(
                          intl,
                          'me.tabs.myDetails.invite.dependent.email',
                          'Dependent email address',
                        )}
                        testId="dependent-invite-email"
                        component={renderTextField}
                        validate={[validateRequired, validateEmail]}
                      />
                      <Field
                        name="confirmEmail"
                        label={formatMessage(
                          intl,
                          'me.tabs.myDetails.invite.dependent.confirm.email',
                          'Confirm email address',
                        )}
                        testId="dependent-confirm-invite-email"
                        component={renderTextField}
                        validate={[validateRequired, validateEmail]}
                      />
                    </Box>
                    <ButtonGroup>
                      <TrackingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        data-testid="btn-submit-inviteDependent"
                        trackingData={{
                          category: CATEGORIES.DETAILS_PAGE,
                          action: 'Invite dependents',
                        }}
                      >
                        {formatMessage(
                          intl,
                          'me.tabs.myDetails.invite.dependent.button.submit',
                          'Send Invite',
                        )}
                      </TrackingButton>
                    </ButtonGroup>
                  </form>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const onSubmit = (values, _, props) => {
  const { intl, relationshipCategory } = props;
  const { dateOfBirth, dependentEmail, confirmEmail } = values;

  const errors = {
    confirmEmail: validateEmailsMatch(intl, dependentEmail, confirmEmail),
    dateOfBirth: validateDateOfBirth(intl, dateOfBirth, relationshipCategory),
  };

  if (errors.confirmEmail !== '' || errors.dateOfBirth !== '') {
    throw new SubmissionError(errors);
  }
  const loaderMessage = props.intl.formatHTMLMessage({
    id: 'me.tabs.myDetails.invite.dependent.submitLoaderMessage',
    defaultMessage: 'Sending an invite...<br/>Do not close or refresh',
  });

  const dependentData = {
    dependentId: props.memberId,
    dependentName: props.dependentName,
    hasDefaultDateOfBirth: props.hasDefaultDateOfBirth,
    dependentEmail,
    dateOfBirth,
  };
  props.inviteDependentAction(dependentData, loaderMessage);
};

InviteDependent.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  dependentName: PropTypes.string.isRequired,
  emailAlreadyTaken: PropTypes.shape({}),
  hasDefaultDateOfBirth: PropTypes.bool.isRequired,
  submissionErrors: PropTypes.shape({}),
  setFormErrorIfEamilAlreadyTaken: PropTypes.func.isRequired,
};

InviteDependent.defaultProps = {
  emailAlreadyTaken: {},
  submissionErrors: {},
};

export default compose(
  injectIntl,
  withStyles(Styles),
  reduxForm({
    enableReinitialize: true,
    destroyOnUnmount: false,
    keepDirtyOnReinitialize: false,
    onSubmit,
    form: 'inviteDependent',
  }),
)(InviteDependent);
