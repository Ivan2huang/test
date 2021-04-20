import { mapDispatchToProps } from '../ActivationContainer';

jest.mock('../action', () => ({
  validateActivation: jest.fn((email, token) => ({
    type: 'VALIDATE_ACTIVATION',
    payload: {
      email,
      token,
    },
  })),
}));

it('should dispatch the validate activation action', () => {
  const dispatch = jest.fn();

  const dispatchToProps = mapDispatchToProps(dispatch);
  const expected = {
    type: 'VALIDATE_ACTIVATION',
    payload: {
      email: 'test@test.com',
      token: 'sdkj23k23',
    },
  };
  dispatchToProps.activate('test@test.com', 'sdkj23k23');

  expect(dispatch).toHaveBeenCalledWith(expected);
});
