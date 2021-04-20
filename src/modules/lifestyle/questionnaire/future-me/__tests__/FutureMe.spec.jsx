/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { reduxForm } from 'redux-form';

import FutureMe from '../FutureMe';
import withIntl from '../../../../../i18n/withIntlProvider';
import withRedux from '../../../../../redux/withReduxProvider';
import withTheme from '../../../../../themes/withThemeProvider';

jest.mock(
  '../../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock('../../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock(
  '../../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      <span>{children}</span>
      <span>{<span>{mockPropsCapture(rest)}</span>}</span>
    </div>
  ),
);

jest.mock('../renderUploadImage', () => ({ handleChange, ...rest }) => (
  <div>
    RenderUploadImage Component
    <button
      type="button"
      onClick={e => handleChange(e.target.files, e.target.isValid)}
      data-testid="btn-show-error"
    >
      file Uploader
    </button>
    <span>{<span>{mockPropsCapture(rest)}</span>}</span>
  </div>
));

jest.mock(
  '../../../../../uiComponents/FilePicker',
  () => ({ testId, onChange, component: Component, ...rest }) => {
    return (
      <div>
        Filepicker component
        <input
          data-testid={testId}
          onChange={e => onChange([e.target.value], e.target.isValid)}
        />
        <span>{mockPropsCapture(rest)}</span>
        <Component />
      </div>
    );
  },
);

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: (intl, id, defaultMessage) => defaultMessage,
}));

jest.mock(
  '../../../../common/shared/withRemoteFeatureChecker',
  () => component => {
    // eslint-disable-next-line no-param-reassign
    component.defaultProps = {
      ...component.defaultProps,
      isFeatureEnabled: () => true,
    };
    return component;
  },
);

window.scrollTo = jest.fn();

describe('FutureMe  Component', () => {
  URL.createObjectURL = jest.fn(image => image.url);
  const props = {
    futureMeImage: undefined,
    fieldChange: jest.fn(),
    getFaceAgingImage: jest.fn(),
  };
  const routerProps = {
    router: {
      query: {
        pos: '',
      },
    },
  };
  const Component = withTheme(
    withIntl(
      withRedux(
        reduxForm({
          form: 'form',
        })(FutureMe),
      ),
    ),
  );
  const setUp = (componentProps = props, isScrollToUpload = false) => {
    if (isScrollToUpload) {
      routerProps.router.query.pos = 'faceAging';
    }
    return render(<Component {...componentProps} {...routerProps} />);
  };

  beforeEach(() => {
    URL.createObjectURL = jest.fn(({ name }) => name);
  });

  afterEach(() => {
    props.getFaceAgingImage.mockReset();
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container, getByTestId } = setUp();
    const showError = getByTestId('btn-show-error');

    fireEvent.click(showError, {
      target: {
        files: ['test.png'],
        isValid: true,
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with future image', () => {
    const newProps = {
      futureMeImage: { url: 'test.png' },
      fieldChange: jest.fn(),
      getFaceAgingImage: jest.fn(),
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should call get face aging function on mount', () => {
    const { rerender } = setUp();

    expect(props.getFaceAgingImage).toHaveBeenCalledTimes(1);

    rerender(<Component {...props} futureMeImage={{}} {...routerProps} />);

    expect(props.getFaceAgingImage).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot when image is uploaded', () => {
    const { container } = setUp({
      futureMeImage: { url: 'test.png' },
      fieldChange: jest.fn(),
      getFaceAgingImage: jest.fn(),
    });

    expect(container).toMatchSnapshot();
    expect(URL.createObjectURL).toHaveBeenCalledWith({ url: 'test.png' });
  });

  it('should show error when invalid image is uploaded', () => {
    const { container, getByTestId } = setUp();
    const showError = getByTestId('btn-show-error');

    fireEvent.click(showError, {
      target: {
        files: [],
        isValid: false,
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('should delete photo on delete photo click', () => {
    const newProps = {
      futureMeImage: { url: 'test.png' },
      fieldChange: jest.fn(),
      getFaceAgingImage: jest.fn(),
    };
    const { getByTestId } = setUp(newProps);

    const deleteButton = getByTestId('delete-photo-btn');
    fireEvent.click(deleteButton);

    expect(newProps.fieldChange).toHaveBeenCalledTimes(1);
    expect(newProps.fieldChange).toHaveBeenCalledWith('futureMe.image', null);
  });

  it('should reupload image on reupload button click', () => {
    const newProps = {
      futureMeImage: { url: 'test.png' },
      fieldChange: jest.fn(),
      getFaceAgingImage: jest.fn(),
    };
    const { getByTestId } = setUp(newProps);

    const reuploadButton = getByTestId('btn-reupload-file');
    fireEvent.change(reuploadButton, {
      target: { value: 'image.png', isValid: true },
    });

    expect(newProps.fieldChange).toHaveBeenCalledWith(
      'futureMe.image',
      'image.png',
    );
  });

  it('should scroll to upload face image section', () => {
    setUp(props, true);
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
