/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Recommendations from '../Recommendations';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      Typography Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock('../../shared/ItemContainer', () => ({ children, ...rest }) => (
  <div>
    <span>Item Container Component</span>
    <div>{children}</div>
    <span>{mockPropsCapture(rest)}</span>
  </div>
));

jest.mock(
  '../../shared/ComponentLoaderAndError',
  () => ({ children, ...rest }) => (
    <div>
      ComponentLoaderAndError Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatAmount: jest.fn((intl, amount) => amount),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Recommendations Component', () => {
  const props = {
    loading: true,
    errorState: false,
    title: 'Title',
    recommendations: [
      {
        id: '18',
        name: 'Yaw Tennis Racquet Stress Mental 3',
        provider: 'Yawtennis',
        currency: 'HKD',
        price: 100.0,
        url: 'test/18',
        imageUrl: null,
        specialPrice: 1.0,
      },
      {
        id: '14',
        name: 'Yaw Tennis Racquet Activity 2',
        provider: 'Yawtennis',
        currency: 'HKD',
        price: 50.0,
        url: 'test/14',
        imageUrl: 'image/14',
        specialPrice: 0,
      },
      {
        id: '12',
        name: 'Yaw Tennis Racquet Activity 1',
        provider: 'Yawtennis',
        currency: 'HKD',
        price: 50.0,
        discount: 50,
        url: 'test/12?opt=1',
        imageUrl: 'image/12',
        specialPrice: 25.0,
      },
    ],
    getRecommendations: jest.fn(),
  };
  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(Recommendations));
    return render(<Component {...componentProps} />);
  };

  afterEach(() => {
    props.getRecommendations.mockReset();
  });

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for specific recommendations', () => {
    const { container } = setUp({ ...props, tipCategory: 'alcohol' });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for empty recommendations', () => {
    const { container } = setUp({
      ...props,
      loading: false,
      errorState: false,
      recommendations: [],
    });

    expect(container).toMatchSnapshot();
  });

  it('should get recommendations on load', () => {
    setUp();

    expect(props.getRecommendations).toHaveBeenCalledWith(undefined);
  });

  it('should get recommendations for specific health risk on load', () => {
    setUp({ ...props, tipCategory: 'alcohol' });

    expect(props.getRecommendations).toHaveBeenCalledWith('alcohol');
  });

  it('should show recommendation url in new window', () => {
    window.open = jest.fn();
    const { getByTestId } = setUp();
    const recommendedCardBtn = getByTestId('btn-recommendation-18');

    fireEvent.click(recommendedCardBtn);

    expect(window.open).toHaveBeenCalledWith(
      'test/18?rec=suggestedoffers&type=lo&pos=1',
      '_self',
    );
  });

  it('should show recommendation url in new window when click on image', () => {
    window.open = jest.fn();
    const { getByTestId } = setUp();
    const recommendedCardBtn = getByTestId('img-recommendation-14');

    fireEvent.click(recommendedCardBtn);

    expect(window.open).toHaveBeenCalledWith(
      'test/14?rec=suggestedoffers&type=lo&pos=2',
      '_self',
    );
  });

  it('should show recommendation url tips in new window', () => {
    window.open = jest.fn();
    const { getByTestId } = setUp({ ...props, tipCategory: 'alcohol' });
    const recommendedCardBtn = getByTestId('btn-recommendation-12');

    fireEvent.click(recommendedCardBtn);

    expect(window.open).toHaveBeenCalledWith(
      'test/12?opt=1&rec=suggestedoffers&type=lr&pos=3',
      '_self',
    );
  });
});
