import { mapDispatchToProps, mapStateToProps } from '../ContactUsContainer';

describe('Contact Us Container', () => {
  it('should dispatch getContactInfo action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_CONTACT_INFO',
      payload: {},
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getContactInfo();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should call map state to props', () => {
    const state = {
      miscData: {
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
    const stateProps = mapStateToProps(state);

    expect(stateProps).toEqual(expected);
  });
});
