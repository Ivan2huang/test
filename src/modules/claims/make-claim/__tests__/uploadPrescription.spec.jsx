import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { reduxForm } from 'redux-form';
import UploadPrescription from '../uploadPrescription';
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

describe('UploadPrescription Component', () => {
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
      })(withTheme(UploadPrescription)),
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

  it('should call change when uploadPrescription select file', () => {
    const result = setUp();
    const element = result.getByTestId('input-upload-prescriptions');
    fireEvent.change(element, {
      target: {
        files: {
          0: { name: 'test.png', size: 630480 },
          length: 1,
        },
      },
    });
    expect(props.onChangeHandle).toHaveBeenCalledWith('prescriptions.files', [
      { name: 'test.png', size: 630480 },
    ]);
  });
});
