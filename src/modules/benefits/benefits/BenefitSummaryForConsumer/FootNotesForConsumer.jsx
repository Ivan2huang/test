/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, withStyles } from '@material-ui/core';
import Typography from '../../../../uiComponents/Typography';
import GridItem from '../../../../uiComponents/GridItem';
import Grid from '../../../../uiComponents/Grid';
import {
  formatMessage,
  removeUnicodeScript,
} from '../../../../helpers/helpers';

const styles = () => ({
  sup: {
    fontSize: '6px',
    paddingRight: '2px',
    fontWeight: 600,
  },
});

const FootNotes = ({ classes, intl, footNotes }) => {
  const sortedNotes = footNotes.sort(
    (a, b) => +a.footnoteSuperscript - +b.footnoteSuperscript,
  );
  const totalNotes = sortedNotes.length;
  const halfCount = Math.ceil(parseFloat(totalNotes / 2));

  const renderFootnoteColumn = notes => {
    return notes.map(({ footnote, footnoteSuperscript }, index) => (
      <Box pt={5} key={index}>
        <Typography type="style-8">
          <sup className={classes.sup}>{footnoteSuperscript}</sup>
          {removeUnicodeScript(footnote)}
        </Typography>
      </Box>
    ));
  };

  return (
    totalNotes > 0 && (
      <>
        <Typography type="style-8">
          {`${formatMessage(intl, 'me.tabs.benefits.label.Notes', 'Notes:')}`}
        </Typography>
        <Grid>
          <GridItem columns={{ xs: 12, md: 6 }}>
            {renderFootnoteColumn(sortedNotes.slice(0, halfCount))}
          </GridItem>
          <GridItem columns={{ xs: 12, md: 6 }}>
            {renderFootnoteColumn(sortedNotes.slice(halfCount, totalNotes))}
          </GridItem>
        </Grid>
      </>
    )
  );
};

FootNotes.propTypes = {
  classes: PropTypes.shape({
    sup: PropTypes.string.isRequired,
  }).isRequired,
  footNotes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  intl: PropTypes.shape({}).isRequired,
};

FootNotes.defaultProps = {
  className: '',
};

export default injectIntl(withStyles(styles)(FootNotes));
