import React from 'react';
import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import Typography from '../../../uiComponents/Typography';
import Questions from './Questions';

const QuestionsSection = ({ title, imageUrl, questions }) => (
  <Box mt={{ xs: 12, md: 16 }}>
    <Grid>
      <GridItem offset={{ md: 1 }} columns={{ md: 3 }}>
        <img src={imageUrl} alt="" />
      </GridItem>
      <GridItem columns={{ xs: 12, md: 6 }}>
        <Box mb={{ xs: 8, md: 10 }}>
          <Typography type="style-1">{title}</Typography>
        </Box>
        <Questions questions={questions} />
      </GridItem>
    </Grid>
  </Box>
);

QuestionsSection.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.exact({
      questionOrder: PropTypes.string.isRequired,
      questionId: PropTypes.string.isRequired,
      dependentQuestion: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      section: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.exact({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          hasInversion: PropTypes.bool,
        }),
      ).isRequired,
      activationAnswer: PropTypes.arrayOf(PropTypes.string),
      hasDefaultValue: PropTypes.bool,
      parentQuestionId: PropTypes.string,
      titleLabel: PropTypes.string,
      selectFieldLabel: PropTypes.string,
      buttonLabel: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default QuestionsSection;
