/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UsefulDocuments from '../UsefulDocuments';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import downloadFile from '../../../../helpers/downloadFile';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../../../../uiComponents/FileItems', () => ({ files, onClick }) => (
  <div>
    File Items
    {files.map((file, index) => (
      <button
        type="button"
        key={file.name}
        data-testid={`file-${index}`}
        onClick={() => onClick(file)}
      >
        {file.name}
      </button>
    ))}
  </div>
));

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);
jest.mock('../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../helpers/downloadFile');

afterEach(() => {
  jest.clearAllMocks();
});

describe('useful documents component', () => {
  const props = {
    usefulDocuments: [{ name: 'name', url: 'url', contentType: 'pdf' }],
  };

  const Component = withTheme(withIntl(UsefulDocuments));
  const setup = (newProps = { ...props }) => {
    return render(<Component {...newProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const { getByTestId } = setup();
    const fileButton = getByTestId('file-0');

    fireEvent.click(fileButton);

    expect(downloadFile).toHaveBeenCalledTimes(1);
    expect(downloadFile).toHaveBeenCalledWith('url', 'name.pdf');
  });
});
