/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import RenderRadioGroup from '../renderRadioGroup';

jest.mock('../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>
    {children}
    (Typography)
  </div>
));

describe('RenderRadioGroup Util', () => {
  const props = {
    displayProperty: 'name',
    valueProperty: 'id',
    errorMessage: 'Some error',
    items: [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test3' },
    ],
    input: {},
    meta: { invalid: false, touched: false },
  };

  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  const setUp = (componentProps = props) => {
    return render(<RenderRadioGroup {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error', () => {
    const newProps = {
      ...props,
      meta: {
        touched: true,
        invalid: true,
      },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });
});
