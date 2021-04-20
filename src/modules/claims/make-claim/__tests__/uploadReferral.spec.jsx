import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { reduxForm } from 'redux-form';
import UploadReferral from '../uploadReferral';
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

describe('UploadReferral Component', () => {
  const props = {
    onChangeHandle: jest.fn(),
    intl: {},
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
      })(withTheme(UploadReferral)),
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

  it('should render the referral field when referral is required', () => {
    const newProps = {
      ...props,
      referralRequired: true,
    };

    const result = setUp(newProps);
    const referralLetterField = result.queryByTestId('input-upload-referral');

    expect(referralLetterField).toBeInTheDocument();
    expect(result.container).toMatchSnapshot();
  });

  it('should call onchange callback when referral letter file is selected', () => {
    const newProps = {
      ...props,
      referralRequired: true,
    };

    const result = setUp(newProps);
    const element = result.getByTestId('input-upload-referral');
    fireEvent.change(element, {
      target: {
        files: {
          0: { name: 'test.png', size: 630480 },
          length: 1,
        },
      },
    });

    expect(props.onChangeHandle).toHaveBeenCalledWith('referral.files', [
      { name: 'test.png', size: 630480 },
    ]);
  });
});
