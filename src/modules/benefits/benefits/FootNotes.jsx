import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import GridItem from '../../../uiComponents/GridItem';
import Grid from '../../../uiComponents/Grid';
import { formatMessage } from '../../../helpers/helpers';

const FootNotes = ({ footNotes, footNotesHalf, intl, className }) => (
  <Grid className={className}>
    <GridItem columns={{ xs: 12, md: 12 }}>
      <Typography type="style-8">
        {`${formatMessage(intl, 'me.tabs.benefits.label.Notes', 'Notes:')}`}
      </Typography>
    </GridItem>
    <GridItem columns={{ xs: 12, md: 6 }}>
      {footNotes.slice(1, footNotesHalf + 1).map((footNote, index) => {
        const footNoteIndex = index + 1;
        return (
          <Box key={`footnote-${index + 100}`} pt={5}>
            <Typography type="style-8">
              <sup>{footNoteIndex}</sup>
              {footNote}
            </Typography>
          </Box>
        );
      })}
    </GridItem>
    <GridItem columns={{ xs: 12, md: 6 }}>
      {footNotes.slice(footNotesHalf + 1).map((footNote, index) => {
        const footNoteIndex = +(index + footNotesHalf + 1);
        return (
          <Box key={`footnote-${index + 10}`} pt={5}>
            <Typography type="style-8">
              <sup>{footNoteIndex}</sup>
              {footNote}
            </Typography>
          </Box>
        );
      })}
    </GridItem>
  </Grid>
);

FootNotes.propTypes = {
  footNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  footNotesHalf: PropTypes.number.isRequired,
  intl: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

FootNotes.defaultProps = {
  className: '',
};

export default injectIntl(FootNotes);
