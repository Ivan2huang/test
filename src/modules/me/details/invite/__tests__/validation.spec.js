import {
  validateEmail,
  validateRequired,
  hasValue,
  validateEmailsMatch,
  validateDateOfBirth,
} from '../validation';
import { email, required } from '../../../../../helpers/validation';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../../helpers/validation.js', () => ({
  email: jest.fn(),
  required: jest.fn(),
}));

jest.mock('../../../../../constants/config', () => ({
  minSpouseAge: 18,
  minChildAge: 18,
  maxChildAge: 23,
}));

describe('Dependent invitation validation', () => {
  it('should return a invalid email message when invalid email is provided', () => {
    email.mockReturnValueOnce(true);
    const expected = 'Enter a valid email address';

    const actual = validateEmail('a.com', undefined, {});

    expect(actual).toBe(expected);
  });

  it('should return empty string when valid email is provided', () => {
    email.mockReturnValueOnce(false);
    const expected = '';

    const actual = validateEmail('a@b.com', undefined, {});

    expect(actual).toBe(expected);
  });

  it('should return is required when no email is provided', () => {
    required.mockReturnValueOnce(false);
    const expected = 'Required';

    const actual = validateRequired('', undefined, {});

    expect(actual).toBe(expected);
  });

  it('should return is required when empty string is provided', () => {
    required.mockReturnValueOnce(true);
    const expected = '';

    const actual = validateRequired('a@b.com', undefined, {});

    expect(actual).toBe(expected);
  });

  it('should trim string when string with trailing spaces is provided', () => {
    const expected = 'a@b.com';

    const actual = hasValue('a@b.com ');

    expect(actual).toBe(expected);
  });

  it('should return true when non string is provided', () => {
    const expected = true;

    const actual = hasValue(4);

    expect(actual).toBe(expected);
  });

  it('should return true when emails match', () => {
    const expected = '';

    const intl = undefined;
    const dependentEmail = 'test@test.com';
    const confirmEmail = 'TEST@tesT.com';
    const actual = validateEmailsMatch(intl, dependentEmail, confirmEmail);

    expect(actual).toBe(expected);
  });

  it('should return false when emails does not match', () => {
    const expected = 'Emails do not match';

    const intl = undefined;
    const dependentEmail = 'test@test.com';
    const confirmEmail = 'TEST123@tesT.com';
    const actual = validateEmailsMatch(intl, dependentEmail, confirmEmail);

    expect(actual).toBe(expected);
  });

  it('should return no error when relationship is not spouse or child', () => {
    const expected = '';

    const intl = undefined;
    const age = 18;
    const dateOffset = new Date();
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - age,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Self');
    expect(actual).toBe(expected);
  });

  it('should return no error when dateOfBirth for dependent spouse is above min age', () => {
    const expected = '';

    const intl = undefined;
    const spouseMinAge = 18;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() - 1);
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - spouseMinAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Spouse');
    expect(actual).toBe(expected);
  });

  it('should return error when dateOfBirth for dependent spouse is exactly min age', () => {
    const expected =
      'Your spouse does not meet the age requirement to access the dependent app and website for HSBC Benefits';

    const intl = undefined;
    const spouseMinAge = 18;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate());
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - spouseMinAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Spouse');
    expect(actual).toBe(expected);
  });

  it('should return error when dateOfBirth for dependent spouse is below min age', () => {
    const expected =
      'Your spouse does not meet the age requirement to access the dependent app and website for HSBC Benefits';

    const intl = undefined;
    const spouseMinAge = 18;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() + 1);
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - spouseMinAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Spouse');
    expect(actual).toBe(expected);
  });

  it('should return no error when dateOfBirth for dependent child is above min age', () => {
    const expected = '';

    const intl = undefined;
    const childMinAge = 18;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() - 1);
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - childMinAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Child');
    expect(actual).toBe(expected);
  });

  it('should return error when dateOfBirth for dependent child is exactly min age', () => {
    const expected =
      'Your child does not meet the age requirement to access the dependent app and website for HSBC Benefits';

    const intl = undefined;
    const childMinAge = 18;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate());
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - childMinAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Child');
    expect(actual).toBe(expected);
  });

  it('should return error when dateOfBirth for dependent child is below min age', () => {
    const expected =
      'Your child does not meet the age requirement to access the dependent app and website for HSBC Benefits';

    const intl = undefined;
    const childMinAge = 18;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() + 1);
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - childMinAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Child');
    expect(actual).toBe(expected);
  });

  it('should return no error when dateOfBirth for dependent child is below max age', () => {
    const expected = '';

    const intl = undefined;
    const childMaxAge = 23;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() + 1);
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - childMaxAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Child');
    expect(actual).toBe(expected);
  });

  it('should return no error when dateOfBirth for dependent child is exactly max age', () => {
    const expected =
      'Your child does not meet the age requirement to access the dependent app and website for HSBC Benefits';

    const intl = undefined;
    const childMaxAge = 23;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() - 1);
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - childMaxAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Child');
    expect(actual).toBe(expected);
  });

  it('should return error when dateOfBirth for dependent child is above max age', () => {
    const expected =
      'Your child does not meet the age requirement to access the dependent app and website for HSBC Benefits';

    const intl = undefined;
    const childMaxAge = 23;
    const dateOffset = new Date();
    dateOffset.setDate(dateOffset.getDate() - 1);
    const dateOfBirth = new Date(
      dateOffset.getFullYear() - childMaxAge,
      dateOffset.getMonth(),
      dateOffset.getDate(),
    );

    const actual = validateDateOfBirth(intl, dateOfBirth, 'Child');
    expect(actual).toBe(expected);
  });
});
