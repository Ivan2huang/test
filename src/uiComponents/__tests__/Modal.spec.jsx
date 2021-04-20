import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Modal from '../Modal';
import withTheme from '../../themes/withThemeProvider';

describe('Modal UI Component', () => {
  it('should match snapshot', () => {
    const open = true;
    const Component = withTheme(Modal);
    render(
      <Component
        open={open}
        handleClose={jest.fn()}
        testId="testId"
        actions={[{ name: 'test', action: jest.fn, testId: 'test' }]}
        title="test title"
      >
        <div>Dummy Content</div>
      </Component>,
    );

    expect(document.querySelector('.MuiDialog-root')).toMatchSnapshot();
  });

  it('should close modal on click on Close icon', () => {
    const handleClose = jest.fn();
    const open = true;
    const Component = withTheme(Modal);
    const { getByTestId } = render(
      <Component
        open={open}
        handleClose={handleClose}
        testId="testId"
        actions={[{ name: 'test', action: jest.fn, testId: 'test' }]}
        title="test title"
      >
        <div>Dummy Content</div>
      </Component>,
    );
    const CloseIconButton = getByTestId('testId');

    fireEvent.click(CloseIconButton);

    expect(handleClose).toHaveBeenCalled();
  });
});
