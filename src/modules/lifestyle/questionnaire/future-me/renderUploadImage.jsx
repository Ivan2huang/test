import React from 'react';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import { UploadIcon } from '../../../../icons';
import FilePicker from '../../../../uiComponents/FilePicker';
import { UPLOAD_RULE_ID } from '../constants';

const FILE_TYPES = ['png', 'jpeg', 'jpg', 'tiff', 'tif'];
const FILE_SIZE = 2048000;

const UploadImage = () => (
  <Box
    height={240}
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <UploadIcon />
  </Box>
);

const renderUploadImage = ({ handleChange }) => (
  <FilePicker
    component={UploadImage}
    testId="btn-add-file"
    fileTypes={FILE_TYPES}
    fileSize={FILE_SIZE}
    onChange={handleChange}
    fullWidth
    inputProps={{
      'aria-describedby': UPLOAD_RULE_ID,
    }}
  />
);

renderUploadImage.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default renderUploadImage;
