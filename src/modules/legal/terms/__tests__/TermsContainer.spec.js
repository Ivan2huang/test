import { mapDispatchToProps, mapStateToProps } from '../TermsContainer';

describe('Terms Container', () => {
  it('should dispatch get terms and conditions action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_TERMS_CONDITIONS',
      payload: {
        alreadyAcceptedTerms: true,
      },
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getTermsConditions(true);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch accept terms action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'ACCEPT_TERMS',
      payload: {
        alreadyAcceptedEdm: true,
      },
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.acceptTerms(true);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should pass props to component', () => {
    const state = {
      legalContents: {
        termsConditions: { content: 'Terms and conditions' },
      },
      me: {
        member: {
          profile: {
            isTermsAccepted: false,
          },
        },
      },
    };

    const expected = {
      termsConditions: 'Terms and conditions',
      alreadyAcceptedTerms: false,
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
