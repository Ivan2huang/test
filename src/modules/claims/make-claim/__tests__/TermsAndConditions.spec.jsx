import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TermsAndConditions from '../TermsAndConditions';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(() => true),
}));

describe('TermsAndConditions Component', () => {
  it('should Match snapshot', () => {
    const Component = withIntl(withTheme(TermsAndConditions));
    render(
      <Component
        open
        content={{ 'en-HK': 'eng' }}
        updateTNCModal={jest.fn()}
        updateTNCAction={jest.fn()}
      />,
    );

    expect(document.querySelector('.MuiDialog-root')).toMatchSnapshot();
  });
  it('should update tnc Modal and tnc Action state on accept the term and condition ', () => {
    const Component = withIntl(withTheme(TermsAndConditions));
    const open = true;
    const updateTNCModal = jest.fn();
    const updateTNCAction = jest.fn();

    const { getByTestId } = render(
      <Component
        open={open}
        content={{ 'en-HK': 'eng' }}
        updateTNCModal={updateTNCModal}
        updateTNCAction={updateTNCAction}
      />,
    );
    const tncButton = getByTestId('btn-tnc');

    fireEvent.click(tncButton);

    expect(updateTNCModal).toHaveBeenCalledWith(false);
    expect(updateTNCAction).toHaveBeenCalledWith(true);
  });
  it('should update tnc Modal and tnc Action state on closeing  the term and condition dialog ', () => {
    const Component = withIntl(withTheme(TermsAndConditions));
    const open = true;
    const updateTNCModal = jest.fn();
    const updateTNCAction = jest.fn();

    const { getByTestId } = render(
      <Component
        open={open}
        content={{ 'en-HK': 'eng' }}
        updateTNCModal={updateTNCModal}
        updateTNCAction={updateTNCAction}
      />,
    );
    const tncButton = getByTestId('modal-close-tnc');

    fireEvent.click(tncButton);

    expect(updateTNCModal).toHaveBeenCalledWith(false);
    expect(updateTNCAction).toHaveBeenCalledWith(false);
  });
});
