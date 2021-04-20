/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

import FaceAgingErrorModal from '../FaceAgingErrorModal';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: obj =>
    Object.entries(obj).length === 0 && obj.constructor === Object,
}));

jest.mock(
  '../../../../uiComponents/Modal',
  // eslint-disable-next-line react/prop-types
  () => ({ children, title, open, handleClose, actions }) => {
    return (
      <>
        {open && (
          <div>
            Modal Component
            <div>{title}</div>
            <div>{children}</div>
            <button
              data-testid="btn-onClose"
              type="button"
              onClick={() => {
                handleClose();
                actions[0].action();
              }}
            >
              X
            </button>
          </div>
        )}
      </>
    );
  },
);

describe('FaceAgingErrorModal Component', () => {
  let props = {};
  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(FaceAgingErrorModal));
    return render(<Component {...componentProps} />);
  };

  beforeEach(() => {
    props = {
      open: false,
      onClose: jest.fn(),
    };
  });

  it('should match snapshot when not open modal', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when open modal', () => {
    props.open = true;
    const { container } = setUp(props);

    expect(container).toMatchSnapshot();
  });

  it('should call close modal', () => {
    props.open = true;
    const { getByTestId } = setUp(props);
    fireEvent.click(getByTestId('btn-onClose'));
    expect(props.onClose).toHaveBeenCalled();
  });
});
