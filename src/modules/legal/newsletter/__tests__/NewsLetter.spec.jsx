import React from 'react';

import Router from 'next/router';
import { render, fireEvent } from '@testing-library/react';

import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import NewsLetter from '../NewsLetter';

jest.mock('../../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'en-HK'),
}));

jest.mock('next/router');

describe('NewsLetter Component', () => {
  let Component;
  let props;

  beforeEach(() => {
    props = {
      newsLetter: {
        'en-HK': 'English Content',
        'zh-HK': 'Chinese Content',
      },
      getNewsLetter: jest.fn(),
    };

    Component = withIntl(withTheme(NewsLetter));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with default english content', () => {
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with chinese content when click on language tab', () => {
    const { container, getByTestId } = render(<Component {...props} />);
    fireEvent.click(getByTestId('chinese-tab'));

    expect(container).toMatchSnapshot();
  });

  it('should go to previous page on go back button click', () => {
    const { getByTestId } = render(<Component {...props} />);
    const backButton = getByTestId('btn-back-to-previous-page');

    fireEvent.click(backButton);
    expect(Router.back).toHaveBeenCalledTimes(1);
  });

  it('should call get news letter content on the first time', () => {
    render(<Component {...props} />);
    expect(props.getNewsLetter).toHaveBeenCalledTimes(1);
  });

});
