/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent, wait, getByText } from '@testing-library/react';
import withIntl from '../../../../../i18n/withIntlProvider';
import withTheme from '../../../../../themes/withThemeProvider';
import withRedux from '../../../../../redux/withReduxProvider';
import InviteDependent from '../InviteDependent';
import {
  validateEmail,
  validateRequired,
  validateEmailsMatch,
  validateDateOfBirth,
} from '../validation';
import { navigateTo } from '../../../../../helpers/helpers';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  navigateTo: jest.fn(),
}));

jest.mock('../validation');
validateRequired.mockImplementation(() => '');
validateEmail.mockImplementation(() => '');
validateEmailsMatch.mockImplementation(() => '');
validateDateOfBirth.mockImplementation(() => '');

jest.mock('../../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock(
  '../../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock('../../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock(
  '../../../../../uiComponents/ButtonGroup',
  () => ({ children, inverse, ...rest }) => (
    <div data-inverse={inverse} {...rest}>
      <span>Button Group Component</span>
      {children}
    </div>
  ),
);

const fireUpdateDate = (dateOfBirthButton, value) => {
  fireEvent.click(dateOfBirthButton);
  const dialog = document.querySelector('[role=dialog]');
  const selectDate = getByText(dialog, value);
  fireEvent.click(selectDate);

  const okButton = getByText(dialog, 'OK');
  fireEvent.click(okButton);
};

describe('InviteDependentComponent', () => {
  it('should match the snapshot', () => {
    const componentProps = {
      dependent: {
        fullName: 'Helen Tan',
        memberId: '111',
      },
      dependentName: 'Test',
      hasDefaultDateOfBirth: false,
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
    };
    const Component = withRedux(withIntl(InviteDependent));
    const result = render(<Component {...componentProps} />);

    expect(result.container).toMatchSnapshot();
  });

  it('should call onSubmit on form submit', async () => {
    const inviteData = {
      dependentId: '111',
      dependentName: 'Helen Tan',
      dependentEmail: 'test@test.com',
    };

    const componentProps = {
      dependentName: 'Helen Tan',
      memberId: '111',
      inviteDependentAction: jest.fn(),
      hasDefaultDateOfBirth: false,
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
    };
    const Component = withRedux(withIntl(withTheme(InviteDependent)));
    const result = render(<Component {...componentProps} />);

    const dateOfBirthButton = result
      .getByTestId('dependent-invite-dateofbirth')
      .querySelector('button');
    const emailInput = result
      .getByTestId('dependent-invite-email')
      .querySelector('input');
    const confirmEmailInput = result
      .getByTestId('dependent-confirm-invite-email')
      .querySelector('input');
    const button = result.getByTestId('btn-submit-inviteDependent');

    fireUpdateDate(dateOfBirthButton, '10');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(confirmEmailInput, { target: { value: 'test@test.com' } });

    fireEvent.click(button, {});

    await wait(() => {
      expect(componentProps.inviteDependentAction).toHaveBeenCalledTimes(1);
      expect(componentProps.inviteDependentAction).toHaveBeenCalledWith(
        expect.objectContaining(inviteData),
        'Sending an invite...<br/>Do not close or refresh',
      );
    });
  });

  it('should show error if email and confirm email do not match', async () => {
    validateEmailsMatch.mockImplementation(() => 'Emails do not match');
    const componentProps = {
      dependent: {
        fullName: 'Helen Tan',
        memberId: '111',
      },
      inviteDependentAction: jest.fn(),
      hasDefaultDateOfBirth: false,
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
      dependentName: 'test',
    };
    const Component = withRedux(withIntl(withTheme(InviteDependent)));
    const result = render(<Component {...componentProps} />);

    const dateOfBirthButton = result
      .getByTestId('dependent-invite-dateofbirth')
      .querySelector('button');
    const emailInput = result
      .getByTestId('dependent-invite-email')
      .querySelector('input');
    const confirmEmailInput = result
      .getByTestId('dependent-confirm-invite-email')
      .querySelector('input');
    const button = result.getByTestId('btn-submit-inviteDependent');

    fireUpdateDate(dateOfBirthButton, '10');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(confirmEmailInput, {
      target: { value: 'test2@test.com' },
    });
    fireEvent.click(button, {});

    await wait(() => {
      expect(result.getByText('Emails do not match')).toBeDefined();
    });
  });

  it('should call set form error when email already taken props has errorState', async () => {
    const componentProps = {
      dependent: {
        fullName: 'Helen Tan',
        memberId: '111',
      },
      inviteDependentAction: jest.fn(),
      emailAlreadyTaken: {
        errorState: true,
      },
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
      hasDefaultDateOfBirth: false,
      dependentName: 'test',
    };

    const Component = withRedux(withIntl(withTheme(InviteDependent)));
    render(<Component {...componentProps} />);

    expect(
      componentProps.setFormErrorIfEamilAlreadyTaken,
    ).toHaveBeenCalledTimes(1);
    expect(componentProps.setFormErrorIfEamilAlreadyTaken).toHaveBeenCalledWith(
      {
        formName: 'inviteDependent',
        fieldName: 'dependentEmail',
        errorMessage: 'Email already exist. Try a new email address',
      },
    );
  });

  it('should not call set form error when email already taken props has no errorState', async () => {
    const componentProps = {
      dependent: {
        fullName: 'Helen Tan',
        memberId: '111',
      },
      inviteDependentAction: jest.fn(),
      emailAlreadyTaken: {
        errorState: false,
      },
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
      hasDefaultDateOfBirth: false,
      dependentName: 'test',
    };

    const Component = withRedux(withIntl(withTheme(InviteDependent)));
    render(<Component {...componentProps} />);

    expect(
      componentProps.setFormErrorIfEamilAlreadyTaken,
    ).toHaveBeenCalledTimes(0);
  });

  it('should show error if date of birth is not entered', async () => {
    validateRequired.mockImplementation(() => 'Required');
    const componentProps = {
      dependent: {
        fullName: 'Helen Tan',
        memberId: '111',
        relationship: 'child',
      },
      dependentName: 'test',
      hasDefaultDateOfBirth: false,
      inviteDependentAction: jest.fn(),
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
    };
    const Component = withRedux(withIntl(withTheme(InviteDependent)));
    const result = render(<Component {...componentProps} />);

    const emailInput = result
      .getByTestId('dependent-invite-email')
      .querySelector('input');
    const confirmEmailInput = result
      .getByTestId('dependent-confirm-invite-email')
      .querySelector('input');
    const button = result.getByTestId('btn-submit-inviteDependent');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(confirmEmailInput, { target: { value: 'test@test.com' } });
    fireEvent.click(button, {});

    await wait(() => {
      expect(result.getByText('Enter date of birth')).toBeDefined();
    });
  });

  it('should show error if date of birth has submission error', async () => {
    validateRequired.mockImplementation(() => 'Required');
    const componentProps = {
      hasDefaultDateOfBirth: false,
      submissionErrors: {
        dateOfBirth: 'Date of birth error',
      },
      inviteDependentAction: jest.fn(),
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
      dependentName: 'test',
    };
    const Component = withRedux(withIntl(withTheme(InviteDependent)));
    const result = render(<Component {...componentProps} />);
    const button = result.getByTestId('btn-submit-inviteDependent');
    fireEvent.click(button, {});

    await wait(() => {
      expect(result.getByText('Date of birth error')).toBeDefined();
    });
  });

  it('should navigate to me page when back to my details button is clicked', async () => {
    const componentProps = {
      dependent: {
        fullName: 'Helen Tan',
        memberId: '111',
      },
      dependentName: 'test',
      inviteDependentAction: jest.fn(),
      hasDefaultDateOfBirth: false,
      setFormErrorIfEamilAlreadyTaken: jest.fn(),
    };
    const Component = withRedux(withIntl(InviteDependent));
    const result = render(<Component {...componentProps} />);

    const button = result.getByTestId('btn-back-mydetails-inviteDependent');
    fireEvent.click(button, {});

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/me/details');
    });
  });
});
