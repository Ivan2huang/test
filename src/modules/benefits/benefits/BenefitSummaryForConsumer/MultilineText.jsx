/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../../../../uiComponents/Typography';

const MultilineText = ({ text, type }) => {
  return text.split('\n').map(
    (line, lineIndex) =>
      (line && (
        <Typography key={lineIndex} type={type}>
          {line}
        </Typography>
      )) || <br />,
  );
};

MultilineText.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

MultilineText.defaultProps = {
  text: '',
  type: 'style-6',
};

export default MultilineText;
