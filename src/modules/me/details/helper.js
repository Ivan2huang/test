import { IsDependent, IsEmployee } from '../../../helpers/roles';
import { GetDisplayRelationship } from '../../../helpers/relationships';

/* eslint-disable import/prefer-default-export */
export const getFieldsByRole = formatMessage => (
  {
    memberId,
    fullName,
    role,
    relationshipToEmployee,
    membershipNumber,
    workEmail,
    policyNumber,
    certificateNumber,
    email,
    contactNumber,
  },
  loggedInId = null,
  loggedInRole = null,
  personalEmailActionUrl,
  mobileNumberActionUrl,
) => {
  const isEditable = value => value && loggedInId === memberId;
  const isAddable = value => !value && loggedInId === memberId;

  let shouldDisplayExtraInfo = false;
  if (IsEmployee(loggedInRole) || loggedInId === memberId) {
    shouldDisplayExtraInfo = true;
  }

  return [
    {
      label: {
        id: 'me.tabs.myDetails.label.name',
        defaultMessage: 'Name',
      },
      value: fullName,
    },
    IsDependent(role) && {
      label: {
        id: 'me.tabs.myDetails.label.relationship',
        defaultMessage: 'Relationship',
      },
      value: GetDisplayRelationship(relationshipToEmployee, formatMessage),
    },
    {
      label: {
        id: 'me.tabs.myDetails.label.membershipNumber',
        defaultMessage: 'Membership Number',
      },
      value: membershipNumber || '-',
    },
    shouldDisplayExtraInfo &&
      policyNumber && {
        label: {
          id: 'me.tabs.myDetails.label.policyNumber',
          defaultMessage: 'Policy Number',
        },
        value: policyNumber,
      },
    !IsDependent(role) &&
      shouldDisplayExtraInfo &&
      certificateNumber && {
        label: {
          id: 'me.tabs.myDetails.label.certificateNumber',
          defaultMessage: 'Certificate Number',
        },
        value: certificateNumber,
      },
    IsEmployee(role) && {
      label: {
        id: 'me.tabs.myDetails.label.companyEmail',
        defaultMessage: 'Company email address',
      },
      value: workEmail,
    },
    shouldDisplayExtraInfo && {
      label: {
        id: 'me.tabs.myDetails.label.email',
        defaultMessage: 'Email address',
      },
      value: email || '-',
      editable: isEditable(email),
      addable: isAddable(email),
      url: personalEmailActionUrl,
    },
    shouldDisplayExtraInfo && {
      label: {
        id: 'me.tabs.myDetails.label.mobileNumber',
        defaultMessage: 'Mobile number',
      },
      value: contactNumber || '-',
      editable: isEditable(contactNumber),
      addable: isAddable(contactNumber),
      url: mobileNumberActionUrl,
    },
  ].reduce((acc, field) => {
    if (!field) {
      return acc;
    }

    const { label, value, editable, addable, url } = field;

    return [
      ...acc,
      {
        value,
        label: formatMessage(label),
        editable: !!editable,
        addable: !!addable,
        url,
      },
    ];
  }, []);
};
