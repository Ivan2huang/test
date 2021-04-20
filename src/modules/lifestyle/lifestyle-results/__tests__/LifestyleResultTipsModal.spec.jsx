/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LifestyleResultTipsModal from '../LifestyleResultTipsModal';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import config from '../../../../constants/config';

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

jest.mock('../../general-tips/Tip', () => props => {
  return (
    <div>
      Tips Component
      <span>{mockPropsCapture(props)}</span>
    </div>
  );
});

jest.mock(
  '../../../common/shared/ItemContainer',
  () => ({ children, ...rest }) => {
    return (
      <div>
        ItemContainer
        <span>{mockPropsCapture(rest)}</span>
        <span>{children}</span>
      </div>
    );
  },
);

jest.mock('../../../common/shared/Error', () => ({ children, ...rest }) => {
  return (
    <div>
      Error Component
      <span>{mockPropsCapture(rest)}</span>
      <span>{children}</span>
    </div>
  );
});

jest.mock('../../../common/recommendations', () => ({
  Recommendations: props => (
    <div>
      Recommendations for specific product
      <span>{mockPropsCapture(props)}</span>
    </div>
  ),
}));

jest.mock('../../../../constants/config', () => ({
  featureToggleLifestyleSuggestions: false,
  defaultLanguage: 'en',
}));

describe('LifestyleResultTipsModal component', () => {
  const props = {
    open: true,
    onClose: jest.fn(),
    title: 'Test title',
    description: 'Test description',
    subtitle: 'Test subtitle',
    tips: [
      {
        topic: 'test topic',
        source: 'test source',
        text: 'test text',
        link: 'http://xyz.com',
      },
    ],
    errorState: false,
    tipCategory: 'test',
  };

  const setup = (componentProps = props) => {
    const Component = withIntl(withTheme(LifestyleResultTipsModal));
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    setup();

    expect(document.querySelector('.MuiDialog-root')).toMatchSnapshot();
  });

  it('should match snapshot when featureToggleLifestyleSuggestions is on', () => {
    config.featureToggleLifestyleSuggestions = true;
    setup();

    expect(document.querySelector('.MuiDialog-root')).toMatchSnapshot();
  });

  it('should call onClose on click of close icon button', () => {
    const { getByTestId } = setup();
    const closeBtn = getByTestId('btn-close-Test title');

    fireEvent.click(closeBtn);

    expect(props.onClose).toHaveBeenCalled();
  });
});
