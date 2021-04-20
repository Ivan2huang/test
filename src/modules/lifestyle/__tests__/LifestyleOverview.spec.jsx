/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import withIntl from '../../../i18n/withIntlProvider';

import LifestyleOverview from '../LifestyleOverview';

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../general-tips', () => ({
  GeneralTips: () => <div>General Tips Component</div>,
}));

jest.mock('../lifestyle-results', () => ({
  LifestyleResults: () => <div>LifeStyle Results Component</div>,
}));

jest.mock('../LifestyleOverviewHeader', () => () => (
  <div>LifeStyle Overview Header Component</div>
));

jest.mock('../lifestyle-score', () => ({
  LifestyleScore: () => <div>LifeStyle Score Component</div>,
}));

jest.mock('../lifestyle-history', () => ({
  LifestyleHistory: () => <div>Lifestyle History Component</div>,
}));

jest.mock('../face-aging', () => ({
  FaceAging: () => <div>Face Aging Component</div>,
}));

jest.mock('../../common/recommendations', () => ({
  SuggestionRecommendations: () => <div>Suggestions Component</div>,
}));

jest.mock('../../../uiComponents/Grid', () => ({ children, ...rest }) => (
  <div>
    Grid Component
    <span>{mockPropsCapture(rest)}</span>
    {children}
  </div>
));

jest.mock('../../../uiComponents/GridItem', () => ({ children, ...rest }) => (
  <div>
    GridItem Component
    <span>{mockPropsCapture(rest)}</span>
    {children}
  </div>
));

jest.mock('../../../constants/config', () => ({
  featureToggleLifestyleSuggestions: true,
  defaultLanguage: 'en',
}));

describe('Lifestyle Landing Component', () => {
  let result;

  beforeEach(() => {
    const Component = withIntl(LifestyleOverview);
    result = render(<Component />);
  });

  it('should match snapshot', () => {
    const { container } = result;
    expect(container).toMatchSnapshot();
  });
});
