/* eslint-disable react/prop-types */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import withTheme from '../../../themes/withThemeProvider';
import LifestyleButtons from '../LifestyleButtons';
import { navigateTo } from '../../../helpers/helpers';
import withIntl from '../../../i18n/withIntlProvider';

jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../helpers/paths', () => ({
  common: {
    findDoctor: '/clinic',
    questionnaire: '/questionnaire',
  },
}));

describe('LifestyleButton Component', () => {
  it('should match snapshot', () => {
    const Component = withIntl(withTheme(LifestyleButtons));

    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for when user want to update questionnaire', () => {
    const Component = withIntl(withTheme(LifestyleButtons));

    const { container } = render(<Component questionnaireUpdateButton />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to questionnaire page', () => {
    const Component = withIntl(withTheme(LifestyleButtons));
    const { getByTestId } = render(<Component />);
    const questionnaireButton = getByTestId('btn-questionnaire');

    fireEvent.click(questionnaireButton);

    expect(navigateTo).toHaveBeenCalledWith('/questionnaire');
  });
});
