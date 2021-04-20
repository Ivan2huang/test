/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import UploadDocuments from '../renderUploadDocuments';
import { validateFiles } from '../../../../helpers/helpers';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div>
    <span>Typography Component</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../../../../uiComponents/FileItems', () => props => (
  <div>
    <span>File Items Component</span>
    <span
      role="button"
      tabIndex="0"
      data-testid="close-button"
      onClick={() => props.onCloseClick(0)}
      onKeyPress={() => props.onCloseClick(0)}
    >
      Close Button
    </span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => {
        return `${key} = ${
          typeof value === 'function' ? `function ${key}` : value
        }`;
      })}
    </span>
  </div>
));

jest.mock('../../../../helpers/helpers', () => ({
  validateFiles: jest.fn(files => files.filter(f => typeof f === 'object')),
}));

URL.createObjectURL = jest.fn(file => file.name);

describe('UploadDocuments Component', () => {
  const props = {
    id: 'upload',
    title: 'Receipts',
    description:
      'Upload up to 5 files (max 2MB each). We accept PDF, JPG, TIFF, PNG or HEIC.',
    filePickerLabel: 'Upload Receipts',
    maxFiles: 5,
    testId: 'input-upload-receipts',
    fields: {
      getAll: () => [
        {
          name: 'file1.jpg',
          size: 120480,
        },
        {
          name: 'file2.pdf',
          size: 340480,
        },
      ],
    },
    meta: {
      valid: true,
    },
    onChangeHandle: jest.fn(),
    fileTypes: undefined,
  };

  let result;

  beforeEach(() => {
    const Component = withTheme(UploadDocuments);
    result = render(<Component {...props} />);
  });

  afterEach(() => {
    props.onChangeHandle.mockReset();
  });

  it('should match snapshot', () => {
    expect(result.container).toMatchSnapshot();
  });

  it('should call onchange callback with selected files (2 file was selected)', () => {
    const inputFile = result.getByTestId('input-upload-receipts');

    fireEvent.change(inputFile, {
      target: {
        files: {
          0: { name: 'test1.png', size: 450480 },
          1: { name: 'test2.png', size: 230480 },
          2: { name: 'test3.png', size: 630480 },
          length: 3,
        },
      },
    });

    expect(props.onChangeHandle).toHaveBeenCalledWith([
      { name: 'file1.jpg', size: 120480 },
      { name: 'file2.pdf', size: 340480 },
      { name: 'test1.png', size: 450480 },
      { name: 'test2.png', size: 230480 },
      { name: 'test3.png', size: 630480 },
    ]);
  });

  it('should call onchange callback with selected files (no file was selected)', () => {
    const newProps = {
      ...props,
      fields: {
        getAll: () => [],
      },
    };
    const Component = withTheme(UploadDocuments);
    result.rerender(<Component {...newProps} />);

    const inputFile = result.getByTestId('input-upload-receipts');

    fireEvent.change(inputFile, {
      target: {
        files: {
          0: { name: 'test1.png', size: 450480 },
          1: { name: 'test2.png', size: 230480 },
          2: { name: 'test3.png', size: 630480 },
          length: 3,
        },
      },
    });

    expect(props.onChangeHandle).toHaveBeenCalledWith([
      { name: 'test1.png', size: 450480 },
      { name: 'test2.png', size: 230480 },
      { name: 'test3.png', size: 630480 },
    ]);
  });

  it('should show error when more than 5 valid files are selected', () => {
    const inputFile = result.getByTestId('input-upload-receipts');
    fireEvent.change(inputFile, {
      target: {
        files: {
          0: { name: 'test1.png', size: 450480 },
          1: { name: 'test2.png', size: 230480 },
          2: { name: 'test3.png', size: 630480 },
          3: { name: 'test4.png', size: 450480 },
          4: { name: 'test5.png', size: 230480 },
          length: 5,
        },
      },
    });

    expect(props.onChangeHandle).toHaveBeenCalledWith([
      { name: 'file1.jpg', size: 120480 },
      { name: 'file2.pdf', size: 340480 },
      { name: 'test1.png', size: 450480 },
      { name: 'test2.png', size: 230480 },
      { name: 'test3.png', size: 630480 },
    ]);
    expect(result.container).toMatchSnapshot();
  });

  it('should show error message when invalid file is selected', () => {
    validateFiles.mockReturnValue([]);
    const inputFile = result.getByTestId('input-upload-receipts');
    fireEvent.change(inputFile, {
      target: {
        files: {
          0: { name: 'test1.html', size: 450480 },
          length: 1,
        },
      },
    });

    expect(result.container).toMatchSnapshot();
  });

  it('should show error message in case of validation error', () => {
    const newProps = {
      ...props,
      fields: {
        getAll: () => [],
      },
      meta: {
        valid: false,
      },
    };
    const Component = withTheme(UploadDocuments);
    result.rerender(<Component {...newProps} />);

    expect(result.container).toMatchSnapshot();
  });

  it('should select only one file at a time', () => {
    const newProps = {
      ...props,
      maxFiles: 1,
    };

    const Component = withTheme(UploadDocuments);
    result.rerender(<Component {...newProps} />);

    const inputFile = result.getByTestId('input-upload-receipts');

    expect(inputFile.multiple).toBe(false);
  });

  it('should render info if it present', () => {
    const newProps = {
      ...props,
      info: 'some information',
    };

    const Component = withTheme(UploadDocuments);
    result.rerender(<Component {...newProps} />);

    expect(result.container).toMatchSnapshot();
  });
  it('should remove file when close icon is clicked', () => {
    const closeIcon = result.getByTestId('close-button');
    fireEvent.click(closeIcon);

    expect(props.onChangeHandle).toHaveBeenCalledWith([
      { name: 'file2.pdf', size: 340480 },
    ]);
  });
});
