import {
  patientDetails,
  claimDetails,
  transformConsultationDate,
} from '../helper';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatAmount: jest.fn((intl, amount) => amount),
  formatDate: jest.fn(date => date.toString()),
}));

describe('Helper functions', () => {
  it('should return patient details', () => {
    const patientName = 'dummy';
    const contactNumber = '123';
    const expected = [
      {
        label: 'Patient name',
        value: 'dummy',
      },
      {
        label: 'Contact number',
        value: '123',
      },
    ];

    const actual = patientDetails(patientName, contactNumber, null);

    expect(actual).toEqual(expected);
  });

  it('should return patient details without contact number', () => {
    const patientName = 'dummy';
    const contactNumber = '';
    const expected = [
      {
        label: 'Patient name',
        value: 'dummy',
      },
      {
        label: 'Contact number',
        value: '-',
      },
    ];

    const actual = patientDetails(patientName, contactNumber, null);

    expect(actual).toEqual(expected);
  });

  it('Should return claim details', () => {
    const claimData = {
      claim: {
        anotherInsurer: false,
        consultationDate: new Date(Date.UTC(2019, 6, 10)),
        receiptAmount: 12,
        isMaternity: false,
        otherInsurerAmount: null,
      },
      consultationType: 'abc',
      selectedClaimReason: 'abc',
    };
    const expected = [
      {
        label: 'Consultation date',
        value: 'Wed Jul 10 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
      },
      {
        label: 'Consultation type',
        value: 'abc',
      },
      {
        label: 'Diagnosis',
        value: 'abc',
      },
      {
        label: 'Receipt amount',
        value: 'HK$ 12',
      },
      {
        label: 'Related to maternity?',
        value: 'No',
      },
    ];

    const actual = claimDetails(claimData, null);

    expect(actual).toEqual(expected);
  });

  it('Should return claim details', () => {
    const claimData = {
      claim: {
        anotherInsurer: true,
        consultationDate: new Date(Date.UTC(2019, 6, 10)),
        receiptAmount: 12,
        isMaternity: true,
        otherInsurerAmount: 10,
      },
      consultationType: 'abc',
      selectedClaimReason: 'abc',
    };
    const expected = [
      {
        label: 'Consultation date',
        value: 'Wed Jul 10 2019 00:00:00 GMT+0000 (Coordinated Universal Time)',
      },
      {
        label: 'Consultation type',
        value: 'abc',
      },
      {
        label: 'Diagnosis',
        value: 'abc',
      },
      {
        label: 'Receipt amount',
        value: 'HK$ 12',
      },
      {
        label: 'Related to maternity?',
        value: 'Yes',
      },
      {
        label: 'Claim amount (other insurer)',
        value: 'HK$ 10',
      },
    ];

    const actual = claimDetails(claimData, null);

    expect(actual).toEqual(expected);
  });
});

describe('Transform consultation date', () => {
  jest.clearAllMocks();
  it('should transform to start of date', () => {
    let actualDate = transformConsultationDate(new Date('2020-01-25T00:00:00'));
    const expected = '2020-01-25T00:00:00';

    expect(actualDate).toEqual(expected);

    actualDate = transformConsultationDate(new Date('2020-01-25T23:59:59'));
    expect(actualDate).toEqual(expected);

    actualDate = transformConsultationDate(new Date('2020-01-25T12:00:00'));
    expect(actualDate).toEqual(expected);
  });
});
