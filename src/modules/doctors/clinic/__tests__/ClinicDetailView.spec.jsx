import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ClinicDetailView from '../ClinicDetailView';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  sentenceCase: jest.fn(str => str),
  isEmpty: jest.fn(),
  formatDate: jest.fn().mockReturnValue('2020/03/16'),
}));

describe('Clinic detail view', () => {
  const props = {
    clinic: {
      id: 3580,
      name: 'Dr. Lam Chi Wan Edwin\n',
      contactNumber1: '2157 1111',
      contactNumber2: '',
      contactNumber3: '333 33333',
      address:
        'Room 1311, Central Building, 1-3 Pedder St., Central, Hong Kong',
      consultationType: 'GASTRO ENTEROLOGY & HEPATOLOGY  ',
      specialty: '',
      appointmentType: 'By appointment',
      consultationTimings: [
        {
          'Mon-Fri': ['10:00AM - 1:00PM', '3:00PM - 6:00PM'],
        },
        {
          'Wed / Sat': ['10:00AM - 1:00PM'],
        },
      ],
      peakHour: '10:00AM - 1:00PM',
      language: 'Cantonese and English',
      area: 'Hong Kong Island',
      district: 'Central',
      latitude: 22.2812194,
      longitude: 114.1571841,
      locale: 'en-HK',
      terminationDate: '',
    },
    showClinicDetail: true,
    backToResults: jest.fn(),
  };

  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(ClinicDetailView));
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when clinic information is missing', () => {
    const newProps = {
      ...props,
      clinic: { id: 3580, name: 'Dr. Lam Chi Wan Edwin\n' },
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when no clinic is selected', () => {
    const newProps = { ...props, clinic: undefined };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when clinic is terminated', () => {
    const newProps = {
      ...props,
      clinic: { ...props.clinic, terminationDate: '12nov2019' },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should call backToResult when clicked on back to results link', () => {
    const { getByTestId } = setUp();
    const backToResultsLink = getByTestId('btn-back-to-results');
    fireEvent.click(backToResultsLink);
    expect(props.backToResults).toHaveBeenCalledTimes(1);
  });
});
