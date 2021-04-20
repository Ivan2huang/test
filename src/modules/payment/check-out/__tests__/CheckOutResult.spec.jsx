import React from 'react';
import { render } from '@testing-library/react';
import CheckOutResult from '../CheckOutResult';
import withIntl from '../../../../i18n/withIntlProvider';

let props;
let Component;

beforeEach(() => {
  props = { paRes: 'paRes', MD: '', validateOrder: jest.fn(), intl: jest.fn() };
  Component = withIntl(CheckOutResult);
});

describe('Checkout Result Component', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should call validate order', () => {
    render(<Component {...props} />);
    expect(props.validateOrder).toHaveBeenCalledTimes(1);
    expect(props.validateOrder).toHaveBeenCalledWith(props.paRes, props.MD);
  });
});
