import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExifJS from 'exif-js';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  rotate90: {
    transform: 'rotate(90deg)',
  },
  rotate180: {
    transform: 'rotate(180deg)',
  },
  rotate270: {
    transform: 'rotate(270deg)',
  },
});

const getExifOrientation = src => {
  return new Promise((resolve, reject) => {
    ExifJS.getData(src, function getData() {
      try {
        const orientation = ExifJS.getTag(this, 'Orientation');
        resolve(orientation);
      } catch (e) {
        reject(e);
      }
    });
  });
};

const Image = React.memo(({ classes, className, src }) => {
  const [orientationClassName, setOrientationClassName] = useState(null);
  const [mixedClassName, setMixedClassName] = useState(className);

  useEffect(() => {
    const getRotateClass = async () => {
      try {
        const orientation = await getExifOrientation(src);

        if (orientation === 6) {
          setOrientationClassName(classes.rotate90);
        } else if (orientation === 8) {
          setOrientationClassName(classes.rotate270);
        } else if (orientation === 3) {
          setOrientationClassName(classes.rotate180);
        } else {
          setOrientationClassName(null);
        }
      } catch (e) {
        setOrientationClassName(null);
      }
    };
    getRotateClass();
  }, [src]);

  return (
    <img
      onLoad={() =>
        setMixedClassName(`${className} ${orientationClassName || ''}`)
      }
      className={mixedClassName}
      src={URL.createObjectURL(src)}
      alt=""
      data-testid="aging-image"
    />
  );
});

Image.propTypes = {
  classes: PropTypes.exact({
    rotate90: PropTypes.string.isRequired,
    rotate180: PropTypes.string.isRequired,
    rotate270: PropTypes.string.isRequired,
  }).isRequired,
  src: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

Image.defaultProps = {
  className: '',
};

export default withStyles(styles)(Image);
