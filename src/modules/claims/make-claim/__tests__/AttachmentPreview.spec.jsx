import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AttachmentPreview from '../AttachmentPreview';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(() => true),
}));

describe('TermsAndConditions Component', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'file_dummy');
  });

  it('should Match snapshot', () => {
    const Component = withTheme(AttachmentPreview);
    render(
      <Component
        open
        updatePreviewModal={jest.fn()}
        attachment={{ file: {} }}
      />,
    );

    expect(document.querySelector('.MuiDialog-root')).toMatchSnapshot();
  });

  it('should update tnc Modal and tnc Action state on closeing  the term and condition dialog ', () => {
    const Component = withTheme(AttachmentPreview);
    const updatePreviewModal = jest.fn();
    const { getByTestId } = render(
      <Component
        classes={{ content: 'test' }}
        open
        updatePreviewModal={updatePreviewModal}
        attachment={{ file: {} }}
      />,
    );

    const tncButton = getByTestId('close-preview');
    fireEvent.click(tncButton);

    expect(updatePreviewModal).toHaveBeenCalledWith(false);
  });
});
