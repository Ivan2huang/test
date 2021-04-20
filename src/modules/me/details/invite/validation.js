import moment from 'moment';
import { formatMessage } from '../../../../helpers/helpers';
import {
  IsCategorySpouse,
  IsCategoryChild,
} from '../../../../helpers/relationships';
import { email } from '../../../../helpers/validation';
import CONFIG from '../../../../constants/config';

export const hasValue = value => value && (value.trim ? value.trim() : true);

export const required = value => hasValue(value);

export const validateEmail = (value, _, props) => {
  const { intl } = props;
  const notValidEmail = email;

  if (notValidEmail(value)) {
    return formatMessage(
      intl,
      'me.tabs.myDetails.invite.dependent.invalidEmail',
      'Enter a valid email address',
    );
  }
  return '';
};

export const validateRequired = (value, _, props) => {
  const { intl } = props;

  if (!required(value)) {
    return formatMessage(
      intl,
      'me.tabs.myDetails.invite.dependent.isRequired',
      'Required',
    );
  }
  return '';
};

export const validateEmailsMatch = (intl, dependentEmail, confirmEmail) => {
  if (dependentEmail.toLowerCase() !== confirmEmail.toLowerCase()) {
    return formatMessage(
      intl,
      'me.tabs.myDetails.invite.dependent.isEmailNotMatched',
      'Emails do not match',
    );
  }

  return '';
};

const getDaysFromDate = date => {
  const now = moment();
  return moment.duration(now.diff(date)).asDays();
};

const getDateYearsAgo = years => {
  return moment()
    .subtract(years, 'years')
    .endOf('day');
};

const validateSpouseAge = (intl, dobDate) => {
  const { minSpouseAge } = CONFIG;
  const ageInDays = getDaysFromDate(dobDate);
  const minAgeDays = getDaysFromDate(getDateYearsAgo(minSpouseAge)) + 1;
  const isValid = ageInDays > minAgeDays;

  if (!isValid) {
    return formatMessage(
      intl,
      'me.tabs.myDetails.invite.dependent.invalidSpouseAge',
      'Your spouse does not meet the age requirement to access the dependent app and website for HSBC Benefits',
      { minSpouseAge },
    );
  }

  return '';
};

const validateChildAge = (intl, dobDate) => {
  const { minChildAge, maxChildAge } = CONFIG;
  const ageInDays = getDaysFromDate(dobDate);
  const minAgeDays = getDaysFromDate(getDateYearsAgo(minChildAge)) + 1;
  const maxAgeDays = getDaysFromDate(getDateYearsAgo(maxChildAge));
  const isValid = ageInDays > minAgeDays && ageInDays < maxAgeDays;

  if (!isValid) {
    return formatMessage(
      intl,
      'me.tabs.myDetails.invite.dependent.invalidChildAge',
      'Your child does not meet the age requirement to access the dependent app and website for HSBC Benefits',
      { minChildAge, maxChildAge },
    );
  }

  return '';
};

export const validateDateOfBirth = (
  intl,
  dateOfBirth,
  relationshipCategory,
) => {
  if (IsCategorySpouse(relationshipCategory)) {
    return validateSpouseAge(intl, dateOfBirth);
  }
  if (IsCategoryChild(relationshipCategory)) {
    return validateChildAge(intl, dateOfBirth);
  }

  return '';
};
