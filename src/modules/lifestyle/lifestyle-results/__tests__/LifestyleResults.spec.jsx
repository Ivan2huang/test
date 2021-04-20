/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import LifestyleResults from '../LifestyleResults';
import getResultCards from '../helpers/helper';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../common/shared/ComponentLoaderAndError',
  () => ({ children, ...rest }) => (
    <div>
      ComponentLoaderAndError Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock(
  '../../../common/shared/ItemContainer',
  () => ({ children, ...rest }) => (
    <div>
      <span>Item Container Component</span>
      <div>{children}</div>
      <span>{mockPropsCapture(rest)}</span>
    </div>
  ),
);

jest.mock('../ResultCard', () => ({ CardIcon, ...rest }) => (
  <div>
    <span>Results Card Component</span>
    <span>{mockPropsCapture(rest)}</span>
    <CardIcon />
  </div>
));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

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

jest.mock('../helpers/helper', () => ({
  __esModule: true,

  default: jest.fn(() => [
    {
      CardIcon: () => 'Card Icon BMI',
      color: 'warning',
      description: 'Underweight',
      subTitle: 'Underweight',
      title: 'BMI',
      id: 'bmi',
    },
    {
      CardIcon: () => 'Card Icon Diabetes',
      color: 'success',
      description: 'Low',
      subTitle: 'Low',
      title: 'Diabetes',
      id: 'diabetes',
    },
  ]),
}));

describe('LifestyleResults Component', () => {
  const props = {
    getLifestyleResults: jest.fn(),
    lifestyleResults: {
      details: {
        bmiScore: 10,
      },
    },
    lifestyleTips: { bmi: 'bmi tips', diabetes: 'diabetes tips' },
    loading: false,
    errorState: false,
    lifestyleTipsErrorState: false,
  };
  const Component = withIntl(LifestyleResults);
  const setup = (componentProps = props) => {
    return render(<Component {...componentProps} />);
  };

  afterEach(() => {
    props.getLifestyleResults.mockReset();
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should call getLifestyleResults once only on first time render', () => {
    const { rerender } = setup();

    expect(props.getLifestyleResults).toHaveBeenCalledTimes(1);

    rerender(<Component {...props} />);

    expect(props.getLifestyleResults).toHaveBeenCalledTimes(1);
  });

  it('should call getResultCards', () => {
    setup();

    expect(getResultCards).toHaveBeenCalledTimes(1);
  });
});
