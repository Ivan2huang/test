import {
  getCompanyContactDetailsAndFAQs,
  updateCompanyContactDetailsAndFAQs,
} from '../action';

describe('Help actions', () => {
  it('should create get company contact details and faqs', () => {
    const expected = {
      type: 'GET_COMPANY_CONTACT_DETAILS_AND_FAQs',
      payload: {},
    };

    const actual = getCompanyContactDetailsAndFAQs();

    expect(actual).toEqual(expected);
  });

  it('should update company contact details and faqs', () => {
    const expected = {
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

    const actual = updateCompanyContactDetailsAndFAQs(
      {
        email: 'dummy@test.com',
        phone: '+852 3070 5005',
        customerSupportHours:
          '09:00 AM - 05:30 PM Monday to Friday (except Hong Kong Public Holidays)',
      },
      [
        {
          name: 'Coverage',
          content: 'Where can i find the doctor list?',
        },
        {
          name: 'Claims status',
          content: 'What is the claim turnaround time?',
        },
      ],
    );

    expect(actual).toEqual(expected);
  });
});
