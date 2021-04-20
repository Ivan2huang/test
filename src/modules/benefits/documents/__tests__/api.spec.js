import { fetchData } from '../../../../helpers/fetch';
import getUsefulDocuments from '../api';

jest.mock('../../../../helpers/fetch', () => ({
  fetchData: jest.fn(),
  fetchFile: jest.fn(),
}));

describe('Useful Document Api', () => {
  it('should get useful documents response', async () => {
    const response = [
      {
        id: 1,
        code: 'OP',
        title: 'Outpatient Benefit / Wellness Claims Claim Form',
        displayOrder: 1,
        url:
          'cxadevclient1/documents/healthplusopwellnessclaimform_eng_20190626.pdf',
      },
      {
        id: 3,
        code: 'HS',
        title: 'Hospitalisation & Surgical Claim Form',
        displayOrder: 2,
        url:
          'cxadevclient1/documents/healthplushospitalisationandsurgicalclaimform_eng_20190626.pdf',
      },
    ];
    const expected = [
      {
        name: 'Outpatient Benefit / Wellness Claims Claim Form',
        url: '/func-content-documents-download/api/v1/clients//documents/1',
        contentType: 'pdf',
      },
      {
        name: 'Hospitalisation & Surgical Claim Form',
        url: '/func-content-documents-download/api/v1/clients//documents/3',
        contentType: 'pdf',
      },
    ];
    fetchData.mockReturnValue(response);

    const actual = await getUsefulDocuments();

    expect(actual).toMatchObject(expected);
  });
});
