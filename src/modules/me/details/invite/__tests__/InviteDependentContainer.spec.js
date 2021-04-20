import {
  mapDispatchToProps,
  mapStateToProps,
} from '../InviteDependentContainer';

jest.mock('../action', () => {
  const dependentData = {
    dependentEmail: 'helen@mail.com',
    dependentId: '111',
  };
  return {
    inviteDependent: jest.fn(() => ({
      type: 'INVITE_DEPENDENT',
      payload: {
        dependentData,
        loaderMessage: 'Page is loading',
      },
    })),
  };
});

describe('InviteDependentContainer', () => {
  it('should pass props to component', () => {
    const state = {
      me: {
        member: {
          profile: {
            relationships: [
              {
                memberId: '111',
                fullName: 'John',
                email: 'dep@test.com',
                dateOfBirth: new Date(2010, 1, 1),
                relationshipToEmployee: 'Self',
              },
            ],
          },
        },
      },
      error: {
        emailAlreadyTaken: false,
      },
      form: {
        inviteDependent: {
          submitErrors: {
            field: 'hasError',
          },
        },
      },
    };

    const props = {
      router: {
        query: {
          memberId: '111',
        },
      },
    };
    const expected = {
      memberId: '111',
      emailAlreadyTaken: false,
      hasDefaultDateOfBirth: true,
      dependentName: 'John',
      relationship: 'Self',
      submissionErrors: {
        field: 'hasError',
      },
      initialValues: {
        dateOfBirth: new Date(2010, 1, 1),
        dependentEmail: 'dep@test.com',
      },
    };

    const actual = mapStateToProps(state, props);

    expect(actual).toEqual(expected);
  });

  it('should pass props to component with no invite dependent form to get submission errors', () => {
    const state = {
      me: {
        member: {
          profile: {
            relationships: [
              {
                memberId: '111',
                fullName: 'John',
                email: 'dep@test.com',
                dateOfBirth: new Date(2010, 1, 1),
                relationshipToEmployee: 'Self',
              },
            ],
          },
        },
      },
      error: {
        emailAlreadyTaken: false,
      },
      form: {},
    };

    const props = {
      router: {
        query: {
          memberId: '111',
        },
      },
    };
    const expected = {
      memberId: '111',
      emailAlreadyTaken: false,
      hasDefaultDateOfBirth: true,
      dependentName: 'John',
      relationship: 'Self',
      submissionErrors: {},
      initialValues: {
        dateOfBirth: new Date(2010, 1, 1),
        dependentEmail: 'dep@test.com',
      },
    };

    const actual = mapStateToProps(state, props);

    expect(actual).toEqual(expected);
  });

  it('should dispatch the invite dependent action', () => {
    const dispatch = jest.fn();

    const dependentData = {
      dependentEmail: 'helen@mail.com',
      dependentId: '111',
    };

    const expected = {
      type: 'INVITE_DEPENDENT',
      payload: {
        dependentData,
        loaderMessage: 'Page is loading',
      },
    };

    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.inviteDependentAction(dependentData, 'Page is loading');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch stopSubmit if email is already taken', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const formDetails = {
      formName: 'formName',
      fieldName: 'actualField',
      errorMessage: 'error',
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
    dispatchToProps.setFormErrorIfEamilAlreadyTaken(formDetails);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
