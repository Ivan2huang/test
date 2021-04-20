/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import GeneralTips from '../GeneralTips';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../Tip', () => ({ topic, source, link, text }) => {
  return (
    <div>
      <span>{topic}</span>
      <span>{source}</span>
      <span>{text}</span>
      <span>{link}</span>
    </div>
  );
});

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
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      Typography Component
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

describe('General Tips Component', () => {
  const props = {
    getLifestyleTips: jest.fn(),
    tips: [
      {
        topic: 'xyz',
        source: 'abc',
        text: 'test text',
        link: 'http://xyz.com',
      },
    ],
    loading: false,
    errorState: false,
  };

  it('should match snapshot', () => {
    const Component = withIntl(GeneralTips);

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when tips is null', () => {
    const Component = withIntl(GeneralTips);
    props.tips = null;

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when tips is undefined', () => {
    const Component = withIntl(GeneralTips);
    props.tips = undefined;

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should call getLifestyleTips on mount', () => {
    const Component = withIntl(GeneralTips);

    render(<Component {...props} />);

    expect(props.getLifestyleTips).toHaveBeenCalled();
  });
});
