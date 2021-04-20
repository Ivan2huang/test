import React from 'react';
import { render } from '@testing-library/react';
import ExifJS from 'exif-js';

import Image from '../Image';
import withTheme from '../../themes/withThemeProvider';

describe('Image UI Component', () => {
  const props = {
    classes: {},
    className: 'className',
    src: new Blob(['fileData']),
  };
  beforeEach(() => {
    URL.createObjectURL = jest.fn(({ name }) => name);
    jest
      .spyOn(ExifJS, 'getData')
      .mockImplementation((src, callback) => callback());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const Component = withTheme(Image);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
