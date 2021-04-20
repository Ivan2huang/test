import React from 'react';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { validateFiles } from '../helpers/helpers';

const Styles = theme => ({
  wrapper: ({ fullWidth }) => ({
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
      width: fullWidth ? '100%' : 'auto',
    },
  }),
  inputFile: {
    position: 'absolute',
    left: 0,
    height: '100%',
    opacity: 0,
    width: '100%',
    cursor: 'pointer',
    zIndex: 1000,
    color: 'transparent',
    '&:hover, &:focus + *': {
      background: theme.grey1,
    },
  },
});

const FilePicker = ({
  classes,
  component,
  fileTypes,
  multiple,
  testId,
  fileSize,
  onChange,
  inputProps,
  ...rest
}) => {
  const handleOnChange = event => {
    const filesObj = event.target.files;
    if (filesObj.length > 0) {
      const files = Object.keys(filesObj).map(key => filesObj[key]);
      const validFiles = validateFiles(files, fileTypes, fileSize);
      const isAllFileValid = files.length === validFiles.length;
      onChange(validFiles, isAllFileValid);
      // eslint-disable-next-line no-param-reassign
      event.target.value = null;
    }
  };

  return (
    <Box className={classes.wrapper}>
      <input
        type="file"
        title=""
        data-testid={testId}
        className={classes.inputFile}
        onChange={handleOnChange}
        multiple={multiple}
        {...inputProps}
      />
      <Box tabIndex="-1" component={component} {...rest} />
    </Box>
  );
};

FilePicker.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    inputFile: PropTypes.string,
  }).isRequired,
  component: PropTypes.elementType.isRequired,
  fileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  fileSize: PropTypes.number.isRequired,
  multiple: PropTypes.bool,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.shape({}),
};

FilePicker.defaultProps = {
  multiple: false,
  inputProps: {},
};

export default withStyles(Styles)(FilePicker);
