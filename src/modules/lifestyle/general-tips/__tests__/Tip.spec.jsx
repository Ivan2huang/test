import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Tip from '../Tip';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import { logAction } from '../../../../helpers/firebase';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(
    obj => Object.entries(obj).length === 0 && obj.constructor === Object,
  ),
  onEnter: jest.fn((_, callback) => {
    callback();
  }),
}));

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

describe('Tip component', () => {
  let props;
  let propsWithTrackingData;

  beforeEach(() => {
    props = {
      topic: 'xyz',
      source: 'abc',
      text: 'test text',
      link: 'http://xyz.com',
    };

    propsWithTrackingData = {
      topic: 'xyz',
      source: 'abc',
      text: 'test text',
      link: 'http://xyz.com',
      trackingData: {},
    };

    delete window.open;
    window.open = jest.fn();

    logAction.mockClear();
  });

  afterEach(() => {
    window.open.mockClear();
  });

  it('should match snapshot', () => {
    const Component = withIntl(withTheme(Tip));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with tracking data', () => {
    const Component = withIntl(withTheme(Tip));

    const { getByTestId } = render(<Component {...propsWithTrackingData} />);
    const cartItem = getByTestId('card-xyz');

    fireEvent.click(cartItem);

    expect(logAction).toHaveBeenCalledWith({});
  });

  it('should navigate to link when click on the card', () => {
    const windowOpenSpy = jest.spyOn(window, 'open');
    const Component = withIntl(withTheme(Tip));
    const { getByTestId } = render(<Component {...props} />);
    const card = getByTestId(`card-${props.topic}`);

    fireEvent.click(card);

    expect(windowOpenSpy).toHaveBeenCalled();
  });

  it('should navigate to link on enter key press', () => {
    const windowOpenSpy = jest.spyOn(window, 'open');

    const Component = withIntl(withTheme(Tip));
    const { getByTestId } = render(<Component {...props} />);
    const card = getByTestId(`card-${props.topic}`);

    fireEvent.keyPress(card, { key: 'Enter', code: 13, charCode: 13 });

    expect(windowOpenSpy).toHaveBeenCalled();
  });
});
