/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RenderUploadImage from '../renderUploadImage';

jest.mock(
  '../../../../../uiComponents/FilePicker',
  () => ({ component: Component, testId, onChange, ...rest }) => (
    <div>
      FilePicker Component
      <input data-testid={testId} onChange={e => onChange([e.target.value])} />
      <span>{mockPropsCapture(rest)}</span>
      <Component />
    </div>
  ),
);

describe('renderUploadImage component', () => {
  const props = {
    handleChange: jest.fn(),
  };
  const setUp = (componentProps = props) => {
    return render(<RenderUploadImage {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should call onchange on file selection change', () => {
    const { getByTestId } = setUp();
    const fileInput = getByTestId('btn-add-file');

    fireEvent.change(fileInput, {
      target: {
        value: 'test.jpg',
      },
    });

    expect(props.handleChange).toHaveBeenCalledWith(['test.jpg']);
  });
});
