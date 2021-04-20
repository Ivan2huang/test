import React, { useState } from 'react';
import * as PropTypes from 'prop-types';

import { Button, Box } from '@material-ui/core';

import FilePicker from '../../../uiComponents/FilePicker';
import Typography from '../../../uiComponents/Typography';
import FileItems from '../../../uiComponents/FileItems';

import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

/* eslint-disable camelcase */
const FILE_TYPES = ['png', 'jpeg', 'jpg', 'heic', 'heif', 'tiff', 'tif', 'pdf'];
const FILE_SIZE = 2048000;

const UploadDocumentsButton = ({ label, ...rest }) => (
  <Button variant="outlined" color="secondary" {...rest}>
    {label}
  </Button>
);

UploadDocumentsButton.propTypes = {
  label: PropTypes.string.isRequired,
};

const renderUploadDocuments = ({
  id,
  title,
  description,
  info,
  filePickerLabel,
  testId,
  maxFiles,
  onChangeHandle,
  fields,
  meta,
  fileTypes,
}) => {
  const files = fields.getAll();
  const filesWithUrl = files.map(file => ({
    name: file.name,
    file,
  }));
  const [valid, setValid] = useState(true);
  const onChange = (newFiles, isValid) => {
    let allFiles = files.concat(newFiles);
    let isFilesValid = isValid;

    if (allFiles.length > maxFiles) {
      allFiles = allFiles.slice(0, maxFiles);
      isFilesValid = false;
    }

    logAction({
      category: CATEGORIES.CLAIMS_SUBMISSION,
      action: 'Add document by documents',
    });

    setValid(isFilesValid);
    onChangeHandle(allFiles);
  };

  const onRemove = fileIndex => {
    files.splice(fileIndex, 1);
    onChangeHandle(files);
  };

  // TODO: Refactor Typography ui component
  const renderDescription = () => {
    const error = !(valid && meta.valid);
    return (
      <div aria-live="polite">
        {!error && (
          <Typography id={`helptext-${id}-rule`} type="style-6">
            {description}
          </Typography>
        )}
        {error && (
          <Typography id={`helptext-${id}-rule`} type="style-6" color="error">
            {description}
          </Typography>
        )}
      </div>
    );
  };

  return (
    <Box mt={14}>
      <Typography type="style-3">{title}</Typography>
      <Box mt={4}>{renderDescription()}</Box>
      <Box mt={4}>
        <FilePicker
          multiple={maxFiles > 1}
          fileSize={FILE_SIZE}
          fileTypes={fileTypes || FILE_TYPES}
          label={filePickerLabel}
          testId={testId}
          component={UploadDocumentsButton}
          onChange={onChange}
          inputProps={{
            'aria-describedby': `helptext-${id}-rule`,
          }}
        />
      </Box>
      <FileItems files={filesWithUrl} onCloseClick={onRemove} />
      {info && (
        <Box mt={4}>
          <Typography type="style-6">{info}</Typography>
        </Box>
      )}
    </Box>
  );
};

renderUploadDocuments.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.string,
  filePickerLabel: PropTypes.string.isRequired,
  maxFiles: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
  fields: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({}).isRequired,
  onChangeHandle: PropTypes.func.isRequired,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
};

renderUploadDocuments.defaultProps = {
  info: undefined,
  fileTypes: undefined,
};

export default renderUploadDocuments;
