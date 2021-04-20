import reducer from '../reducer';

describe('Misc reducer', () => {
  it('should update conact us info', () => {
    const initialState = {
      contactInfo: {},
    };
    const action = {
      type: 'UPDATE_CONTACT_INFO',
      payload: {
        contactInfo: {
          email: 'mail@test.com',
          phone: '1232334422',
          customerSupportHour: 'customerSupportHour',
        },
      },
    };
    const expected = {
      contactInfo: {
        email: 'mail@test.com',
        phone: '1232334422',
        customerSupportHour: 'customerSupportHour',
      },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual(expected);
  });
});
