import React from 'react';
import { render, cleanup } from '@testing-library/react';
import withIntl from '../../../../i18n/withIntlProvider';
import PaymentResult from '../PaymentResult';

describe('Payment Result Component', () => {
  let props;

  beforeEach(() => {
    props = {
      paRes: '',
      MD: '',
      intl: jest.fn(),
      validateInstrument: jest.fn(),
    };
  });

  afterEach(cleanup);

  it('should match the snapshot', () => {
    const Component = withIntl(PaymentResult);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should call the validate instrument', () => {
    props.paRes = 'test';

    const Component = withIntl(PaymentResult);
    render(<Component {...props} />);

    expect(props.validateInstrument).toHaveBeenCalledWith('test', props.MD);
  });
});
