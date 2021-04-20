import { all, call, takeLatest, put } from 'redux-saga/effects';

import helpSaga, { getCompanyContactDetailsAndFAQsSaga } from '../saga';
import {
  GET_COMPANY_CONTACT_DETAILS_AND_FAQS,
  updateCompanyContactDetailsAndFAQs,
} from '../action';
import getCompanyContactDetailsAndFAQs from '../api';

jest.mock('../action', () => ({
  GET_COMPANY_CONTACT_DETAILS_AND_FAQS: 'GET_COMPANY_CONTACT_DETAILS_AND_FAQS',
  UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQs:
    'UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQs',
  updateCompanyContactDetailsAndFAQs: jest.fn((details, faqs) => ({
    action: 'UPDATE_COMPANY_CONTACT_DETAILS_AND_FAQs',
    payload: {
      companyContactDetails: details,
      faqs,
    },
  })),
}));

jest.mock('../../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

describe('Help saga', () => {
  it('should watch actions', () => {
    const generator = helpSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([
        takeLatest(
          GET_COMPANY_CONTACT_DETAILS_AND_FAQS,
          getCompanyContactDetailsAndFAQsSaga,
        ),
      ]),
    );
  });

  it('should handle get company contact details and faqs saga', () => {
    const action = {
      type: 'GET_COMPANY_CONTACT_DETAILS_AND_FAQS',
      payload: {
        locale: 'en-HK',
      },
    };

    const response = {
      details: {
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
    const generator = getCompanyContactDetailsAndFAQsSaga(action);

    let next = generator.next();

    expect(next.value).toStrictEqual(['START_LOADER', 'page']);

    next = generator.next();
    expect(next.value).toEqual(call(getCompanyContactDetailsAndFAQs, 'en-HK'));

    next = generator.next(response);
    expect(next.value).toEqual(
      put(updateCompanyContactDetailsAndFAQs(response.details, response.faqs)),
    );

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');

    next = generator.next();
    expect(next.done).toEqual(true);
  });
});
