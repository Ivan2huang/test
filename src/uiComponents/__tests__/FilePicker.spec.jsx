import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '@material-ui/core/Button';
import FilePicker from '../FilePicker';
import withTheme from '../../themes/withThemeProvider';
import { validateFiles } from '../../helpers/helpers';

jest.mock('../../helpers/helpers', () => ({
  validateFiles: jest.fn(),
}));

describe('FilePicker UI Component', () => {
  validateFiles.mockImplementation(() => []);
  const onChange = jest.fn();

  afterEach(() => {
    onChange.mockReset();
  });

  it('should match snapshot', () => {
    const Component = withTheme(FilePicker);

    const { container } = render(
      <Component
        multiple
        testId="testInputFile"
        fileTypes={['png']}
        component={() => <Button>Test</Button>}
        fileSize={2097152}
        onChange={onChange}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for fullWidth', () => {
    const Component = withTheme(FilePicker);

    const { container } = render(
      <Component
        fullWidth
        multiple
        testId="testInputFile"
        fileTypes={['png']}
        component={() => <Button>Test</Button>}
        fileSize={2097152}
        onChange={onChange}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call valid fileType on onChange', async () => {
    validateFiles.mockImplementation(() => []);
    const Component = withTheme(FilePicker);

    const { getByTestId } = render(
      <Component
        testId="testInputFile"
        fileTypes={['png']}
        component={() => <Button>Test</Button>}
        fileSize={2097152}
        onChange={onChange}
      />,
    );
    const inputFile = getByTestId('testInputFile');

    fireEvent.change(inputFile, {
      target: {
        files: { 0: { name: 'test.png', size: 630480 }, length: 1 },
      },
    });

    expect(validateFiles).toHaveBeenCalledWith(
      [{ name: 'test.png', size: 630480 }, 1],
      ['png'],
      2097152,
    );
  });

  it('should call onChange with valid Files and isAllFileValid Flag true', async () => {
    validateFiles.mockImplementation(files => files);
    const Component = withTheme(FilePicker);
    const { getByTestId } = render(
      <Component
        testId="testInputFile"
        fileTypes={['png']}
        component={() => <Button>Test</Button>}
        fileSize={2097152}
        onChange={onChange}
      />,
    );
    const inputFile = getByTestId('testInputFile');

    fireEvent.change(inputFile, {
      target: {
        files: {
          0: { name: 'test.png', size: 630480 },
          1: { name: 'test.png', size: 630480 },
          2: { name: 'test.png', size: 630480 },
          length: 3,
        },
      },
    });
    expect(onChange).toHaveBeenCalledWith(
      [
        { name: 'test.png', size: 630480 },
        { name: 'test.png', size: 630480 },
        { name: 'test.png', size: 630480 },
        3,
      ],
      true,
    );
  });

  it('should call onChange with valid Files and isAllFileValid Flag false', async () => {
    validateFiles.mockImplementation(files => [files[0]]);
    const Component = withTheme(FilePicker);
    const { getByTestId } = render(
      <Component
        testId="testInputFile"
        fileTypes={['png']}
        component={() => <Button>Test</Button>}
        fileSize={2097152}
        onChange={onChange}
      />,
    );
    const inputFile = getByTestId('testInputFile');

    fireEvent.change(inputFile, {
      target: {
        files: {
          0: { name: 'test.png', size: 630480 },
          1: { name: 'test.xyz', size: 630480 },
          2: { name: 'test.png', size: 1234567890 },
          length: 3,
        },
      },
    });
    expect(onChange).toHaveBeenCalledWith(
      [{ name: 'test.png', size: 630480 }],
      false,
    );
  });

  it('should not call onChange when no file is selected', async () => {
    validateFiles.mockImplementation(files => files);
    const Component = withTheme(FilePicker);
    const { getByTestId } = render(
      <Component
        testId="testInputFile"
        fileTypes={['png']}
        component={() => <Button>Test</Button>}
        fileSize={2097152}
        onChange={onChange}
      />,
    );
    const inputFile = getByTestId('testInputFile');

    fireEvent.change(inputFile, {
      target: {
        files: {
          length: 0,
        },
      },
    });
    expect(onChange).not.toHaveBeenCalled();
  });
});
