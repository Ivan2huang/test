import {
  validateActivation,
  updateValidationStatus,
  VALIDATE_ACTIVATION,
  UPDATE_VALIDATION_STATUS,
} from '../action';

describe('ValidateActivation Action', () => {
  it('should create action for validate activation', () => {
    const expected = {
      type: VALIDATE_ACTIVATION,
      payload: {
        client: 'dummy@test.com',
        token: '123',
      },
    };

    const actual = validateActivation('dummy@test.com', '123');

    expect(actual).toEqual(expected);
  });

  it('should create action for update validation status', () => {
    const expected = {
      type: UPDATE_VALIDATION_STATUS,
      payload: {
        status: 'invalid',
      },
    };

    const actual = updateValidationStatus('invalid');

    expect(actual).toEqual(expected);
  });
});
