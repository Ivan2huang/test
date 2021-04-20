import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { reduxForm } from 'redux-form';
import UploadSettlementAdvice from '../uploadSettlementAdvice';
import withRedux from '../../../../redux/withReduxProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  validateFiles: jest.fn(files => files.filter(f => typeof f === 'object')),
  isEmpty: jest.fn(() => true),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

describe('UploadSettlementAdvice Component', () => {
  const props = {
    onChangeHandle: jest.fn(),
    intl: {},
    maxAdditionalDocument: 2,
  };

  const setUp = (componentProps = props) => {
    const Component = withRedux(
      reduxForm({
        form: 'form',
        enableReinitialize: true,
        destroyOnUnmount: false,
        keepDirtyOnReinitialize: true,
        initialValues: {
          files: [],
        },
      })(withTheme(UploadSettlementAdvice)),
    );
    return render(<Component {...componentProps} />);
  };

  afterEach(() => {
    props.onChangeHandle.mockReset();
    jest.clearAllMocks();
    cleanup();
  });

  beforeEach(() => {
    URL.createObjectURL = jest.fn(file => file.name);
  });

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should call change when uploadSettlementAdvice select file', () => {
    const result = setUp();
    const element = result.getByTestId('input-upload-settlement-advice');
    fireEvent.change(element, {
      target: {
        files: {
          0: { name: 'test.png', size: 630480 },
          length: 1,
        },
      },
    });
    expect(props.onChangeHandle).toHaveBeenCalledWith(
      'settlementAdvices.files',
      [{ name: 'test.png', size: 630480 }],
    );
  });
});
