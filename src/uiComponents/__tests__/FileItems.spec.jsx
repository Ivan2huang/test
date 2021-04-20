/* eslint-disable react/prop-types,jsx-a11y/alt-text */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import FileItems, { getThumbnail } from '../FileItems';
import Image from '../Image';
import withTheme from '../../themes/withThemeProvider';
import { PdfIcon, FileIcon } from '../../icons';

jest.mock('../Typography', () => ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
));

describe('GetThumbnail', () => {
  it('should get thumbnail for .pdf file', () => {
    const file = {
      name: 'file1.pdf',
    };

    const url = getThumbnail(file);

    expect(url).toEqual(<PdfIcon />);
  });

  it('should get thumbnail for .jpg, .jpeg, .png or .tiff file', () => {
    const jpgFile = {
      name: 'file1.jpg',
      url: '/file1.jpg',
    };
    const jpgFileObj = {
      name: 'file1.jpg',
      file: { name: 'file1', type: 'jpg' },
    };
    const jpegFile = {
      name: 'file1.jpeg',
      url: '/file1.jpeg',
    };
    const pngFile = {
      name: 'file1.png',
      url: '/file1.png',
    };
    const tiffFile = {
      name: 'file1.tiff',
      url: '/file1.tiff',
    };

    expect(getThumbnail(jpgFile)).toEqual(
      <img src="/file1.jpg" alt="file1.jpg" />,
    );

    expect(getThumbnail(jpgFileObj)).toEqual(
      <Image src={{ name: 'file1', type: 'jpg' }} />,
    );
    expect(getThumbnail(jpegFile)).toEqual(
      <img src="/file1.jpeg" alt="file1.jpeg" />,
    );
    expect(getThumbnail(pngFile)).toEqual(
      <img src="/file1.png" alt="file1.png" />,
    );
    expect(getThumbnail(tiffFile)).toEqual(
      <img src="/file1.tiff" alt="file1.tiff" />,
    );
  });

  it('should get thumbnail for unknown formats', () => {
    const file = {
      name: 'file1.heic',
      url: '/file1.heic',
    };

    const url = getThumbnail(file);

    expect(url).toEqual(<FileIcon />);
  });

  it('should get thumbnail for given pdf content type', () => {
    const file = {
      url: 'file1.pdf',
      contentType: 'application/pdf',
    };

    const url = getThumbnail(file);

    expect(url).toEqual(<PdfIcon />);
  });

  it('should get thumbnail for given image content type', () => {
    const file = {
      url: 'file1.jpeg',
      contentType: 'image/jpeg',
    };

    expect(getThumbnail(file)).toEqual(
      <img src="file1.jpeg" alt={undefined} />,
    );
  });
  it('should get thumbnail for unknown formats with contentType provided', () => {
    const file = {
      contentType: 'invalid',
      url: '/file1.heic',
    };

    const url = getThumbnail(file);

    expect(url).toEqual(<FileIcon />);
  });
});

describe('FileItems Component', () => {
  const props = {
    files: [
      {
        name: 'file1.jpg',
        url: '/file1.jpg',
      },
      {
        name: 'file2.pdf',
        url: '/file2.pdf',
      },
      {
        name: 'file3.heic',
        url: '/file3.heic',
      },
    ],
  };

  const setUp = (componentProps = props) => {
    URL.createObjectURL = jest.fn(file => file.name);

    const Component = withTheme(FileItems);
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot without close icon', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with close icon', () => {
    const newProps = {
      ...props,
      onCloseClick: jest.fn(),
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with responsive mode', () => {
    const newProps = {
      ...props,
      responsiveMode: true,
      onCloseClick: jest.fn(),
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with onClick', () => {
    const newProps = {
      ...props,
      onClick: jest.fn(),
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should call onclick callback', () => {
    const newProps = {
      ...props,
      onClick: jest.fn(),
    };

    const { getByTestId } = setUp(newProps);
    const fileItem = getByTestId('file-1');
    fireEvent.click(fileItem, { target: {} });

    expect(newProps.onClick).toHaveBeenCalledWith({
      name: 'file2.pdf',
      url: '/file2.pdf',
    });
  });

  it('should not call onclick callback on key press other than Enter', () => {
    const newProps = {
      ...props,
      onClick: jest.fn(),
    };

    const { getByTestId } = setUp(newProps);
    const fileItem = getByTestId('file-1');
    fireEvent.keyPress(fileItem, { key: 'a', code: 97, charCode: 97 });

    expect(newProps.onClick).not.toHaveBeenCalled();
  });

  it('should call onclick callback on Enter key press', () => {
    const newProps = {
      ...props,
      onClick: jest.fn(),
    };

    const { getByTestId } = setUp(newProps);
    const fileItem = getByTestId('file-1');
    fireEvent.keyPress(fileItem, { key: 'Enter', code: 13, charCode: 13 });

    expect(newProps.onClick).toHaveBeenCalledWith({
      name: 'file2.pdf',
      url: '/file2.pdf',
    });
  });
  it('should call onClick callback of close icon', () => {
    const newProps = {
      ...props,
      onCloseClick: jest.fn(),
    };
    const { getByTestId } = setUp(newProps);
    const closeIcon = getByTestId('close-icon-0');
    fireEvent.click(closeIcon);

    expect(newProps.onCloseClick).toHaveBeenCalledWith(0);
  });

  it('should call onCloseClick callback on Enter key press of close icon', () => {
    const newProps = {
      ...props,
      onCloseClick: jest.fn(),
    };

    const { getByTestId } = setUp(newProps);
    const closeIcon = getByTestId('close-icon-0');
    fireEvent.keyPress(closeIcon, { key: 'Enter', code: 13, charCode: 13 });

    expect(newProps.onCloseClick).toHaveBeenCalledWith(0);
  });
  it('should not call oncloseclick callback on key press other than Enter', () => {
    const newProps = {
      ...props,
      onCloseClick: jest.fn(),
    };

    const { getByTestId } = setUp(newProps);
    const closeIcon = getByTestId('close-icon-0');
    fireEvent.keyPress(closeIcon, { key: 'a', code: 97, charCode: 97 });

    expect(newProps.onCloseClick).not.toHaveBeenCalled();
  });
});
