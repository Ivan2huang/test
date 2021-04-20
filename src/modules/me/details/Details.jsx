import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import Typography from '../../../uiComponents/Typography';
import { LOGGED_IN_MESSAGE, INVALID_MESSAGES } from './constant';
import { getFieldsByRole } from './helper';
import { IsDependent } from '../../../helpers/roles';
import {
  TERMINATED,
  NONE,
  PROCESSING,
  RESEND_EMAIL_PATHNAME,
  UPDATE_EMAIL_PATHNAME,
  UPDATE_MOBILE_NUMBER_PATHNAME,
} from '../constant';
import PendingEmailStatus from './PendingEmailStatus';
import PendingMobileNumberStatus from './PendingMobileNumberStatus';

const today = moment();
const Details = ({
  intl,
  memberProfile,
  personalEmailStatus,
  mobileNumberStatus,
  components: { PersonInfo },
}) => {
  const {
    memberProfileOrder,
    status,
    role: loggedInRole,
    memberId: loggedInId,
    profilePolicyNumber,
    profileCertificateNumber,
  } = memberProfile;
  const [personalEmailActionUrl, setPersonalEmailActionUrl] = useState('');
  const [employee, ...relationships] = memberProfileOrder;
  const getFields = getFieldsByRole(intl.formatMessage);
  const finalEmployeeData = Object.assign({}, employee, {
    policyNumber: profilePolicyNumber,
    certificateNumber: profileCertificateNumber,
  });

  const filteredRelationships = relationships
    .filter(r => {
      if (r.status !== TERMINATED) {
        return true;
      }
      const limitUntilDate = r.limitedAccessUntil
        ? moment.utc(r.limitedAccessUntil, moment.ISO_8601)
        : null;
      return limitUntilDate && limitUntilDate.diff(today) > 0;
    })
    .map(r => ({
      ...r,
      policyNumber: r.profilePolicyNumber || r.policyNumber,
      certificateNumber: r.profileCertificateNumber || r.certificateNumber,
    }));

  const renderPendingChangePersonalEmail = () => {
    if (personalEmailStatus.status !== PROCESSING) return null;
    return (
      <Box mb={8}>
        <PendingEmailStatus />
      </Box>
    );
  };

  const renderPendingChangeMobileNumber = () => {
    if (!mobileNumberStatus.newValue) return null;
    return (
      <Box mb={8}>
        <PendingMobileNumberStatus
          allowedToVerify={mobileNumberStatus.allowedToVerify}
        />
      </Box>
    );
  };

  useEffect(() => {
    const redirectUrl =
      personalEmailStatus.status === PROCESSING
        ? RESEND_EMAIL_PATHNAME
        : UPDATE_EMAIL_PATHNAME;
    setPersonalEmailActionUrl(redirectUrl);
  }, [personalEmailStatus]);

  return (
    memberProfileOrder.length !== 0 && (
      <Box mt={{ xs: 3, sm: 0 }}>
        <Box mb={8}>
          <Typography type="style-2">
            {intl.formatMessage({
              id: 'me.tabs.myDetails.title',
              defaultMessage: 'My details',
            })}
          </Typography>
        </Box>
        {renderPendingChangePersonalEmail()}
        {renderPendingChangeMobileNumber()}
        <Box>
          <Box mb={{ md: 2 }}>
            <Typography type="style-3">
              {intl.formatMessage({
                id: 'me.tabs.myDetails.header.mainPolicyHolder',
                defaultMessage: 'Main policy holder',
              })}
            </Typography>
          </Box>
          <PersonInfo
            fields={getFields(
              finalEmployeeData,
              loggedInId,
              loggedInRole,
              personalEmailActionUrl,
              UPDATE_MOBILE_NUMBER_PATHNAME,
            )}
          />
        </Box>
        <Box mt={{ xs: 8, sm: 8, md: 10 }} mb={{ md: 1 }}>
          {filteredRelationships.length > 0 && (
            <Typography type="style-3">
              {intl.formatMessage({
                id: 'me.tabs.myDetails.header.dependents',
                defaultMessage: 'Dependent(s)',
              })}
            </Typography>
          )}
        </Box>
        {filteredRelationships.map(dependent => {
          const {
            memberId,
            fullName,
            relationshipCategory,
            hasLoggedIn,
            validAgeRange,
            dateOfBirth,
            role,
          } = dependent;

          let invalidAgeRange = false;
          if (IsDependent(role)) {
            invalidAgeRange = dateOfBirth != null && !validAgeRange;
          }

          const isDisabled =
            hasLoggedIn ||
            invalidAgeRange ||
            status === TERMINATED ||
            dependent.status === TERMINATED;
          let invalidMessage = invalidAgeRange
            ? intl.formatMessage(
                ...INVALID_MESSAGES[relationshipCategory.toLowerCase()],
              )
            : '';

          if (hasLoggedIn) {
            invalidMessage = intl.formatMessage(LOGGED_IN_MESSAGE);
          }

          return (
            <Box key={fullName}>
              <PersonInfo
                fields={getFields(
                  dependent,
                  loggedInId,
                  loggedInRole,
                  personalEmailActionUrl,
                  UPDATE_MOBILE_NUMBER_PATHNAME,
                )}
                memberId={memberId}
                buttonLabel={intl.formatMessage({
                  id: 'me.tabs.myDetails.invite.btn',
                  defaultMessage: 'Invite to Benefits',
                })}
                isDisabled={isDisabled}
                invalidMessage={invalidMessage}
                showInviteBtn
              />
            </Box>
          );
        })}
      </Box>
    )
  );
};

Details.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  memberProfile: PropTypes.shape({
    fullName: PropTypes.string,
    membershipNumber: PropTypes.string,
    email: PropTypes.string,
    relationships: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string,
        membershipNumber: PropTypes.string,
        relationship: PropTypes.string.isRequired,
        relationshipCategory: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  personalEmailStatus: PropTypes.shape({
    email: PropTypes.string,
    status: PropTypes.oneOf([NONE, PROCESSING]).isRequired,
  }).isRequired,
  mobileNumberStatus: PropTypes.shape({
    newValue: PropTypes.string,
    allowedToVerify: PropTypes.bool,
    attemptCount: PropTypes.number,
    nextOTPRequestAllowedAtUtc: PropTypes.string,
  }).isRequired,
  components: PropTypes.shape({
    PersonInfo: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(Details);
