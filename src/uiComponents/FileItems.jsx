/* eslint-disable react/prop-types */
import React from 'react';
import * as PropTypes from 'prop-types';

import { Box, withStyles } from '@material-ui/core';

import Image from './Image';
import Typography from './Typography';
import { CloseIcon, PdfIcon, FileIcon } from '../icons';
import { onEnter } from '../helpers/helpers';
import breakpoints from '../themes/breakpoints';

const Styles = theme => ({
  containerMobile: {
    [breakpoints.down('sm')]: {
      overflowX: 'scroll',
    },
  },
  containerInnerMobile: {
    [breakpoints.down('sm')]: {
      display: 'flex',
      whiteSpace: 'nowrap',
    },
  },
  fileWrapper: {
    border: `1px solid ${theme.disabled}`,
    padding: theme.spacingX(2),
    borderRadius: theme.borderRadiusX(1),
    backgroundColor: theme.transparent,
    [breakpoints.up('md')]: {
      backgroundColor: theme.white,
    },
    '&:hover,&:focus': {
      backgroundColor: theme.grey1,
    },
  },
  fileWrapperMobile: {
    [breakpoints.down('sm')]: {
      padding: 0,
      border: `none`,
      position: 'relative',
      marginRight: theme.spacingX(2),
    },
  },
  fileNameMobile: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  content: {
    wordBreak: 'break-all',
    overflow: 'hidden',
  },
  cursor: {
    cursor: 'pointer',
  },
  thumbnail: {
    width: theme.spacingX(10),
    height: theme.spacingX(10),
    marginRight: theme.spacingX(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(svg)': {
      height: theme.spacingX(10),
      width: theme.spacingX(10),
    },
  },
  thumbnailMobile: {
    [breakpoints.down('sm')]: {
      height: 181,
      width: 135,
      position: 'relative',
      marginRight: 0,
      backgroundColor: theme.grey1,
    },

    '& > *': {
      [breakpoints.down('sm')]: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
  },
  closeIcon: {
    width: '12px',
    height: '12px',
  },
});

// TODO Need to remove if(name) condition while removing old claims
export const getThumbnail = ({ name, url, contentType, file }) => {
  if (name) {
    if (/.pdf$/i.test(name)) {
      return <PdfIcon />;
    }
    if (/.[png|jpg|jpeg|tiff]$/i.test(name)) {
      if (file) {
        return <Image src={file} />;
      }
      return <img src={url} alt={name} />;
    }
  }

  if (contentType) {
    if (contentType.includes('pdf')) {
      return <PdfIcon />;
    }
    if (contentType.includes('image')) {
      return <img src={url} alt={name} />;
    }
  }
  return <FileIcon />;
};

const FileItems = ({
  files,
  onCloseClick,
  classes,
  onClick,
  responsiveMode,
}) => {
  const cursorClassName = onClick ? classes.cursor : '';
  const contentTabIndex = onClick ? 0 : -1;
  const renderFileItems = () =>
    files.map((file, index) => {
      const key = `file-${index}`;
      return (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          key={key}
          className={`${classes.fileWrapper} ${
            responsiveMode ? classes.fileWrapperMobile : ''
          }`}
          p={2}
          my={1}
        >
          <Box
            display="flex"
            alignItems="center"
            flex="1"
            tabIndex={contentTabIndex}
            data-testid={key}
            classes={{ root: classes.content }}
            className={cursorClassName}
            onClick={() => onClick && onClick(file)}
            onKeyPress={e => onEnter(e, () => onClick(file))}
          >
            <Box
              className={`${classes.thumbnail} ${
                responsiveMode ? classes.thumbnailMobile : ''
              }`}
            >
              {getThumbnail(file)}
            </Box>
            <Typography
              type="style-8"
              className={`${responsiveMode ? classes.fileNameMobile : ''}`}
            >
              {file.name}
            </Typography>
          </Box>
          {onCloseClick && (
            <CloseIcon
              color="#666"
              data-testid={`close-icon-${index}`}
              tabIndex="0"
              classes={{ root: classes.closeIcon }}
              onClick={() => onCloseClick(index)}
              onKeyPress={e => onEnter(e, () => onCloseClick(index))}
            />
          )}
        </Box>
      );
    });

  return (
    <Box mt={8} className={`${responsiveMode ? classes.containerMobile : ''}`}>
      <Box className={`${responsiveMode ? classes.containerInnerMobile : ''}`}>
        {renderFileItems()}
      </Box>
    </Box>
  );
};

FileItems.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      url: PropTypes.string.isRequired,
      contentType: PropTypes.string,
    }),
  ),
  classes: PropTypes.exact({
    containerMobile: PropTypes.string.isRequired,
    containerInnerMobile: PropTypes.string.isRequired,
    fileWrapper: PropTypes.string.isRequired,
    fileWrapperMobile: PropTypes.string.isRequired,
    fileNameMobile: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cursor: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    thumbnailMobile: PropTypes.string.isRequired,
    closeIcon: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  responsiveMode: PropTypes.bool,
};

FileItems.defaultProps = {
  files: [],
  onClick: undefined,
  onCloseClick: undefined,
  responsiveMode: false,
};

export default withStyles(Styles)(FileItems);
