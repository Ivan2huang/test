/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FaceAging from '../FaceAging';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import { logAction } from '../../../../helpers/firebase';

jest.mock('../../../loader/Loader', () => ({ loading, children }) => {
  return (
    <div>
      {loading.toString()}
      {children}
    </div>
  );
});

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

jest.mock('../../../common/shared/Error', () => ({ errorState, children }) => (
  <div>
    Error state:
    {errorState.toString()}
    {children}
  </div>
));

jest.mock('../../../../uiComponents/Grid', () => ({ children, ...rest }) => (
  <div>
    Grid Component
    <span>{mockPropsCapture(rest)}</span>
    {children}
  </div>
));

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ children, ...rest }) => (
    <div>
      GridItem Component
      <span>{mockPropsCapture(rest)}</span>
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(
    obj => Object.entries(obj).length === 0 && obj.constructor === Object,
  ),
}));

jest.mock('../../../../helpers/url', () => ({
  faceAgingImage: (age, category) =>
    `faceAgingImage/test?age=${age}&category=${category}`,
}));

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

jest.mock(
  '../../../common/shared/withRemoteFeatureChecker',
  () => component => {
    // eslint-disable-next-line no-param-reassign
    component.defaultProps = {
      ...component.defaultProps,
      isFeatureEnabled: () => true,
    };
    return component;
  },
);

describe('Face Aging Component', () => {
  const props = {
    getUserFaceAgingCategories: jest.fn(),
    loading: false,
    errorState: false,
    userFaceAgingData: {
      faceAgingIsDone: true,
      categories: [
        {
          category: 'healthy',
          age: 35,
        },
        {
          category: 'unhealthy',
          age: 35,
        },
        {
          category: 'healthy',
          age: 40,
        },
        {
          category: 'unhealthy',
          age: 40,
        },
        {
          category: 'healthy',
          age: 67,
        },
        {
          category: 'unhealthy',
          age: 67,
        },
      ],
    },
  };

  const changeSliderAge = (ageSlider, xPos) => {
    fireEvent.mouseDown(ageSlider, {
      bubbles: true,
      cancelable: true,
      clientX: xPos,
      clientY: 0,
    });

    fireEvent.mouseUp(ageSlider, {
      bubbles: true,
      cancelable: true,
      clientX: xPos,
      clientY: 0,
    });
  };

  it('should match snapshot', () => {
    const Component = withIntl(withTheme(FaceAging));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when component is loading', () => {
    const newProps = {
      ...props,
      loading: true,
    };
    const Component = withIntl(withTheme(FaceAging));

    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error has occurred', () => {
    const newProps = {
      ...props,
      errorState: true,
    };
    const Component = withIntl(withTheme(FaceAging));
    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call face aging categories on mount', () => {
    const Component = withIntl(withTheme(FaceAging));

    render(<Component {...props} />);

    expect(props.getUserFaceAgingCategories).toHaveBeenCalled();
  });

  it('should match snapshot when categories is empty', () => {
    const newProps = {
      ...props,
      userFaceAgingData: {
        faceAgingIsDone: false,
        categories: [],
      },
    };
    const Component = withIntl(withTheme(FaceAging));
    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should render different images based on age slider', () => {
    const Component = withIntl(withTheme(FaceAging));
    const { container, getByTestId } = render(<Component {...props} />);
    const ageSlider = getByTestId('age-slider');

    changeSliderAge(ageSlider, 500);
    expect(container).toMatchSnapshot();
  });

  it('should call firebase log action on change age slider', () => {
    const Component = withIntl(withTheme(FaceAging));
    const { getByTestId } = render(<Component {...props} />);
    const ageSlider = getByTestId('age-slider');

    logAction.mockClear();
    changeSliderAge(ageSlider, 500);
    expect(logAction).toHaveBeenCalledTimes(1);

    logAction.mockClear();
    changeSliderAge(ageSlider, 500);
    expect(logAction).toHaveBeenCalledTimes(0);
  });
});
