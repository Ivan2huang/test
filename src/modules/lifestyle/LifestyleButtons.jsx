import React from 'react';
import { Box, withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { EditIcon } from '../../icons';
import { formatMessage, navigateTo } from '../../helpers/helpers';
import paths from '../../helpers/paths';
import TrackingButton from '../../uiComponents/TrackingButton';
import { CATEGORIES } from '../../constants/analytics';

const Styles = theme => ({
  lifestyleBtn: {
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    background: theme.white,
    ...theme.typography['style-8'],
    padding: theme.spacingX(4),
    textAlign: 'left',
    borderRadius: theme.borderRadiusX(1),
    height: theme.spacingX(17),
    marginBottom: theme.spacingX(2),
    paddingRight: theme.spacingX(20),
  },
});

const LifestyleButtons = ({ intl, classes, questionnaireUpdateButton }) => {
  const navigateToQuestionnaire = () => navigateTo(paths.common.questionnaire);

  return (
    <>
      <TrackingButton
        className={classes.lifestyleBtn}
        data-testid="btn-questionnaire"
        onClick={navigateToQuestionnaire}
        trackingData={{
          category: CATEGORIES.MY_LIFESTYLE_OVERVIEW,
          action: questionnaireUpdateButton
            ? 'Update my lifestyle data'
            : 'Add my lifestyle data',
        }}
      >
        <EditIcon />
        <Box pl={4}>
          {formatMessage(
            intl,
            `lifestyle.buttons.${questionnaireUpdateButton ? 'update' : 'add'}`,
            'Add my lifestyle data',
          )}
        </Box>
      </TrackingButton>
    </>
  );
};

LifestyleButtons.defaultProps = {
  questionnaireUpdateButton: false,
};

LifestyleButtons.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    lifestyleBtn: PropTypes.string.isRequired,
  }).isRequired,
  questionnaireUpdateButton: PropTypes.bool,
};

export default withStyles(Styles)(injectIntl(LifestyleButtons));
