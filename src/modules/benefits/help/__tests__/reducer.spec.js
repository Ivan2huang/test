import reducer from '../reducer';

describe('Company Contact Details reducer', () => {
  it('should update the store when update company contact details and faqs action has been dispatched', () => {
    const initialState = {
      companyContactDetails: {
        email: '',
        phone: '',
        customerSupportHours: '',
      },
      faqs: [],
    };

    const action = {
      type: 'UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQs',
      payload: {
        companyContactDetails: {
          email: 'dummy@test.com',
          phone: '+852 3070 5005',
          customerSupportHours:
            '09:00 AM - 05:30 PM Monday to Friday (except Hong Kong Public Holidays)',
        },
        faqs: [
          {
            name: 'Coverage',
            content: 'Where can i find the doctor list?',
          },
          {
            name: 'Claims status',
            content: 'What is the claim turnaround time?',
          },
        ],
      },
    };

    const expected = {
      companyContactDetails: {
        email: 'dummy@test.com',
        phone: '+852 3070 5005',
        customerSupportHours:
          '09:00 AM - 05:30 PM Monday to Friday (except Hong Kong Public Holidays)',
      },
      faqs: [
        {
          name: 'Coverage',
          content: 'Where can i find the doctor list?',
        },
        {
          name: 'Claims status',
          content: 'What is the claim turnaround time?',
        },
      ],
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
