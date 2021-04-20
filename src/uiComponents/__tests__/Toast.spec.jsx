import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Toast from '../Toast';
import withTheme from '../../themes/withThemeProvider';

describe('Toast UI Component', () => {
  const props = {
    message: 'Dummy Message',
    open: true,
    handleClose: jest.fn(),
  };

  it('should match the snapshot', () => {
    const Component = withTheme(Toast);

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should hide the toast on close button clicked', () => {
    const Component = withTheme(Toast);

    const { getByTestId } = render(<Component {...props} />);
    const closeIcon = getByTestId('icon-close');
    fireEvent.click(closeIcon);

    expect(props.handleClose).toHaveBeenCalledTimes(1);
  });
});
