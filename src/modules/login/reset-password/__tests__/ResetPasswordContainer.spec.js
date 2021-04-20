import { mapStateToProps, mapDispatchToProps } from '../ResetPasswordContainer';
import ERROR from '../../../../constants/error';

jest.mock('../action', () => ({
  resetPassword: jest.fn(
    (email, password, currentDoB, token, isFirstTimeUser) => ({
      type: 'RESET_PASSWORD',
      payload: {
        email,
        password,
        dateOfBirth: currentDoB,
        token,
        isFirstTimeUser,
      },
    }),
  ),
  validateResetPasswordRequest: jest.fn((email, token) => ({
    type: 'VALIDATE_RESET_PASSWORD_REQUEST',
    payload: {
      email,
      token,
    },
  })),
}));

const props = {
  isFirstTimeUser: false,
};

describe('ResetPasswordContainer', () => {
  it('should pass the props and state to the component', () => {
    const state = {
      error: {
        [ERROR.resetPassword.dateOfBirthMatch]: {
          errorState: false,
        },
      },
      resetPassword: {
        productName: 'test',
      },
    };
    const expected = {
      dateOfBirthMatch: state.error[ERROR.resetPassword.dateOfBirthMatch],
      isFirstTimeUser: false,
      productName: 'test',
    };

    const actual = mapStateToProps(state, props);

    expect(actual).toEqual(expected);
  });

  it('should dispatch the get reset password action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'RESET_PASSWORD',
      payload: {
        email: 'test@test.com',
        password: 'Test@123',
        dateOfBirth: undefined,
        token: 'sdkj23k23',
        isFirstTimeUser: false,
      },
    };

    dispatchToProps.resetPassword(
      'test@test.com',
      'Test@123',
      'sdkj23k23',
      false,
    );

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch the validate reset password action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'VALIDATE_RESET_PASSWORD_REQUEST',
      payload: {
        email: 'test@test.com',
        token: 'sdkj23k23',
      },
    };
    dispatchToProps.validateResetPasswordRequest('test@test.com', 'sdkj23k23');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch stopSubmit if dateOfBirth does not match', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const formDetails = {
      formName: 'formName',
      fieldName: 'actualField',
    };
    const expected = {
      type: '@@redux-form/STOP_SUBMIT',
      error: true,
      meta: {
        form: formDetails.formName,
      },
      payload: {
        [formDetails.fieldName]: 'error',
      },
    };
    dispatchToProps.setFormErrorIfDateOfBirthNoMatch(formDetails);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
