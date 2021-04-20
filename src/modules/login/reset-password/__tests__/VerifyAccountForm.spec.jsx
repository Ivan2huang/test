/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent, wait, getByText } from '@testing-library/react';

import VerifyAccountForm from '../VerifyAccountForm';
import withIntl from '../../../../i18n/withIntlProvider';
import withRedux from '../../../../redux/withReduxProvider';
import { required, password } from '../../../../helpers/validation';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  navigateTo: jest.fn(),
}));

jest.mock('../../../../helpers/validation', () => ({
  required: jest.fn(() => false),
  password: jest.fn(() => false),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock(
  '../../../../uiComponents/ButtonGroup',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      <span>Button Group Component</span>
      {children}
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/ButtonGroup',
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

describe('VerifyAccountForm Component', () => {
  const props = {
    verifyDoB: jest.fn(),
    setFormErrorIfDateOfBirthNoMatch: jest.fn(),
    isFirstTimeUser: false,
    clientId: 'clientA',
  };
  const setUp = (componentProps = props) => {
    const Component = withRedux(withIntl(VerifyAccountForm));
    return render(<Component {...componentProps} />);
  };

  afterEach(() => {
    required.mockReset();
    password.mockReset();
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot for first time user', () => {
    const newProps = { ...props, isFirstTimeUser: true };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should have call success page on submit with with verify', async () => {
    const dateOfBirth = new Date();
    const newProps = {
      ...props,
      email: 'test@dummy.com',
      token: '123',
      dateOfBirth,
    };
    const { getByTestId } = setUp(newProps);
    const dateOfBirthButton = getByTestId('input-dateofbirth').querySelector(
      'button',
    );

    const verifyDoBButton = getByTestId('btn-verify-dob');

    fireUpdateDate(dateOfBirthButton, '10');
    fireEvent.click(verifyDoBButton);

    await wait(() => {
      expect(props.verifyDoB).toHaveBeenCalledTimes(1);
      expect(props.verifyDoB).toHaveBeenCalledWith(
        'test@dummy.com',
        expect.anything(),
        '123',
        'clientA',
        true,
      );
    });
  });

  it('should call set form error when date of birth match props has errorState', async () => {
    const newProps = {
      ...props,
      email: 'test@dummy.com',
      token: '123',
      verifyRequired: '',
      dateOfBirthMatch: {
        errorState: true,
      },
      setFormErrorIfDateOfBirthNoMatch: jest.fn(),
    };

    setUp(newProps);
    expect(newProps.setFormErrorIfDateOfBirthNoMatch).toHaveBeenCalledTimes(1);
    expect(newProps.setFormErrorIfDateOfBirthNoMatch).toHaveBeenCalledWith({
      formName: 'verify-dob',
      fieldName: 'dateOfBirth',
    });
  });

  it('should not call set form error when date of birth match props has no errorState', async () => {
    const newProps = {
      ...props,
      email: 'test@dummy.com',
      token: '123',
      verifyRequired: '',
      setFormErrorIfDateOfBirthNoMatch: jest.fn(),
    };

    setUp(newProps);
    expect(newProps.setFormErrorIfDateOfBirthNoMatch).toHaveBeenCalledTimes(0);
  });
});
