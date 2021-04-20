/* eslint-disable jsx-a11y/no-static-element-interactions,no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ClinicListView from '../ClinicListView';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('@material-ui/core/Hidden', () => ({ children, ...rest }) => (
  <div>
    <div>Hidden Component</div>
    <span>{mockPropsCapture(rest)}</span>
    {children}
  </div>
));

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => (
  <div>
    <div>AutoSizer Component </div>
    {children({ height: 600, width: 600 })}
  </div>
));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  sentenceCase: jest.fn(str => str),
  formatDate: jest.fn().mockReturnValue('2020/03/16'),
}));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('ClinicListView Component', () => {
  const props = {
    selectedStackedClinics: [],
    resultantClinics: [
      {
        id: '1',
        name: 'clinic 1',
        consultationType: 'GENERAL SURGERY',
        address: '132 Nathan Road, Tsim Sha Tsui, Kowloon',
        terminationDate: '12Nov2018',
      },
      {
        id: '2',
        name: 'clinic 2',
        consultationType: 'GASTRO ENTEROLOGY & HEPATOLOGY',
        address: "4/F, 9 Queen's Road Central, Central, Hong Kong",
        terminationDate: '',
      },
      {
        id: '3',
        name: 'clinic 3',
        consultationType: 'CARDIOLOGY',
        address:
          'Room 1311, Central Building, 1-3 Pedder St., Central, Hong Kong',
        terminationDate: '',
      },
    ],
    showClinicDetail: false,
    view: 'map',
    handleOnViewClinicDetailsClick: jest.fn(),
    backToResults: jest.fn(),
    closeFilterPopup: jest.fn(),
  };

  const Component = withIntl(withTheme(ClinicListView));

  const setUp = (componentProps = props) => {
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot for search results list', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when no clinics found on search', () => {
    const newProps = { ...props, resultantClinics: [] };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should show clinic details when clicked on view clinic details link', () => {
    const { getByTestId } = setUp();
    const detailLink = getByTestId('btn-view-clinic-detail-2');
    const expectedSelectedClinic = {
      id: '2',
      name: 'clinic 2',
      consultationType: 'GASTRO ENTEROLOGY & HEPATOLOGY',
      address: "4/F, 9 Queen's Road Central, Central, Hong Kong",
      terminationDate: '',
    };

    fireEvent.click(detailLink);

    expect(props.handleOnViewClinicDetailsClick).toHaveBeenCalledTimes(1);
    expect(props.handleOnViewClinicDetailsClick).toHaveBeenCalledWith(
      expectedSelectedClinic,
      'filteredClinics',
    );
  });

  it('should match snapshot for stacked clinics list', () => {
    const newProps = {
      ...props,
      selectedStackedClinics: [
        {
          id: '2',
          name: 'clinic 2',
          consultationType: 'GASTRO ENTEROLOGY & HEPATOLOGY',
          address: "4/F, 9 Queen's Road Central, Central, Hong Kong",
          terminationDate: '',
        },
        {
          id: '3',
          name: 'clinic 3',
          consultationType: 'CARDIOLOGY',
          address:
            'Room 1311, Central Building, 1-3 Pedder St., Central, Hong Kong',
          terminationDate: '',
        },
      ],
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should go back to search results when back to results button is clicked', () => {
    const newProps = {
      ...props,
      selectedStackedClinics: [
        {
          id: '2',
          name: 'clinic 2',
          consultationType: 'GASTRO ENTEROLOGY & HEPATOLOGY',
          address: "4/F, 9 Queen's Road Central, Central, Hong Kong",
          terminationDate: '',
        },
        {
          id: '3',
          name: 'clinic 3',
          consultationType: 'CARDIOLOGY',
          address:
            'Room 1311, Central Building, 1-3 Pedder St., Central, Hong Kong',
          terminationDate: '',
        },
      ],
    };
    const { getByTestId } = setUp(newProps);

    const backToResultsBtn = getByTestId('btn-back-to-results');

    fireEvent.click(backToResultsBtn);

    expect(newProps.backToResults).toHaveBeenCalledTimes(1);
  });
});
