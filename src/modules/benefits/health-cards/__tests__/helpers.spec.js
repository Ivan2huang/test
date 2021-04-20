import { getQRCodeXML } from '../helpers';

describe('HealthCards Helpers', () => {
  it('should get QR code xml', () => {
    const props = {
      fullName: 'Markus Tan',
      membershipNumber: 'MEM100023',
      certificateNumber: 'CERT3456',
      insurerCode: '12',
      insurerName: 'ABC insurer',
      policyNumber: 'PN1234',
      expiryDate: '12-3-2020',
      insurerType: 'HSBC',
    };

    const actual = getQRCodeXML(props);

    expect(actual).toMatchSnapshot();
  });
});
