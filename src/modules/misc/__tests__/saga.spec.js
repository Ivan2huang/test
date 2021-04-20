import { all, put, call, takeLeading } from 'redux-saga/effects';
import meSaga, { getContactInfoSaga } from '../saga';

import { GET_CONTACT_INFO, updateContactInfo } from '../action';

import { getContactInfo } from '../api';

jest.mock('../action', () => ({
  GET_CONTACT_INFO: 'GET_CONTACT_INFO',
  updateContactInfo: jest.fn(payload => ({
    type: 'UPDATE_CONTACT_INFO',
    payload,
  })),
}));

jest.mock('../api', () => ({
  getContactInfo: jest.fn(),
}));

jest.mock('../../loader', () => ({
  *loader(task, id) {
    yield ['START_LOADER', id];
    yield* task();
    yield 'STOP_LOADER';
  },
}));

describe('Misc Saga', () => {
  it('should watch actions', () => {
    const generator = meSaga();

    const next = generator.next();

    expect(next.value).toEqual(
      all([takeLeading(GET_CONTACT_INFO, getContactInfoSaga)]),
    );
  });

  it('should get and update contact info', () => {
    const response = {
      details: {
        email: 'medicalservice@cxa.com.hk',
        phones: [
          {
            location: 'Hongkong',
            number: '+852 3070 5005',
          },
          {
            location: 'Macau',
            number: '+853 0800 284',
          },
        ],
        customerSupportHours: [
          {
            location: 'Hongkong',
            hour:
              '09:00 AM - 05:30 PM \nMonday to Friday (except Hong Kong Public Holidays)',
          },
          {
            location: 'Macau',
            hour:
              '09:00 AM - 05:30 PM \nMonday to Friday (except Ma Cau Banking holidays)',
          },
        ],
        technicalEmail: 'employee.benefit@hsbc.com.hk',
        note:
          'For faster processing when submitting enquiries, please provide your staff ID or policy number with certificate number, or membership number from your Health card.',
      },
    };

    const generator = getContactInfoSaga({ payload: { locale: 'en-HK' } });
    let next = generator.next();
    expect(next.value).toStrictEqual(['START_LOADER', 'page']);
    next = generator.next();
    expect(next.value).toEqual(call(getContactInfo, 'en-HK'));
    next = generator.next(response);
    expect(next.value).toEqual(put(updateContactInfo(response.details)));

    next = generator.next();
    expect(next.value).toBe('STOP_LOADER');
  });
});
