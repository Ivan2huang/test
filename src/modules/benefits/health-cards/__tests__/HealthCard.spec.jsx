/* eslint-disable no-undef,react/prop-types */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import HealthCard from '../HealthCard';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../health-cards/CardDetails',
  () => ({ fullName, membershipNumber, cardType, coPayment }) => (
    <div>
      Card Details Component
      {fullName}
      {cardType}
      {membershipNumber}
      {coPayment.GP}
      {coPayment.SP}
      {coPayment.PHY}
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../QRCode', () => ({ onClose, ...rest }) => (
  <div>
    QRCode Component
    <span>{mockPropsCapture(rest)}</span>
    <button data-testid="btn-close-qr" type="button" onClick={onClose}>
      Close
    </button>
  </div>
));

jest.mock('../../../../helpers/helpers', () => ({
  today: () => '12 Aug 2019',
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../helpers', () => ({
  getQRCodeXML: jest.fn(
    ({
      fullName,
      membershipNumber,
      certificateNumber,
      insurerCode,
      insurerName,
      policyNumber,
      expiryDate,
    }) =>
      `<xml><n>${fullName}</n><m>${membershipNumber}</m><c>${certificateNumber}</c><ic>${insurerCode}</ic>` +
      `<in>${insurerName}</in><p>${policyNumber}</p><e>${expiryDate}</e></xml>`,
  ),
}));

describe('HealthCard Component', () => {
  const props = {
    fullName: 'William Brown',
    membershipNumber: '123',
    cardType: 'PRIMARY',
    certificateNumber: 'CERT3456',
    insurerCode: 12,
    insurerName: 'ABC insurer',
    policyNumber: 'PN1234',
    coPayment: {
      GP: 10,
      SP: 10,
      PHY: 10,
      GPText: 'GP',
      SPText: 'SP',
      PHYText: 'PHY',
    },
    insurerType: 'HSBC',
  };

  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(HealthCard));
    return render(<Component {...componentProps} />);
  };

  it('should match the snapshot for employee', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot for dependant', () => {
    const newProps = { ...props, cardType: 'SECONDARY' };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should open QR code modal when clicked on view QR code button', () => {
    const { container, getByTestId } = setUp();
    const viewQRModalButton = getByTestId('btn-view-qr-123');

    fireEvent.click(viewQRModalButton);

    expect(container).toMatchSnapshot();
  });

  it('should close QR code modal when clicked on close button', () => {
    const { container, getByTestId } = setUp();
    const viewQRModalButton = getByTestId('btn-view-qr-123');
    const closeQRModalButton = getByTestId('btn-close-qr');
    fireEvent.click(viewQRModalButton);

    fireEvent.click(closeQRModalButton);

    expect(container).toMatchSnapshot();
  });
});
