import { mapDispatchToProps, mapStateToProps } from '../PrivacyContainer';

describe('Privacy modal Container', () => {
  it('should dispatch get privacy policy action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_PRIVACY_POLICY',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getPrivacyPolicy();

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should pass props to component', () => {
    const state = {
      legalContents: {
        privacyPolicy: { content: 'Privacy policy' },
      },
    };

    const expected = {
      privacyPolicy: 'Privacy policy',
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
