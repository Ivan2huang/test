/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Box, makeStyles } from '@material-ui/core';
import GridItem from '../../../../uiComponents/GridItem';
import Typography from '../../../../uiComponents/Typography';
import MultilineText from './MultilineText';

const useStyles = makeStyles(() => ({
  cellWrapper: {
    borderTop: `1px solid rgba(0, 0, 0, 0.05)`,
  },
}));

const BenefitItems = ({
  prefixKey,
  subBenefits,
  checkpoint,
  benefitType,
  options: { columnNameWidth, otherColumnWidth, columnsLabel },
}) => {
  const classes = useStyles();
  const [panelLabel, nonPanelLabel, checkpointLabel] = columnsLabel;
  const renderItemCell = (
    type,
    { text, shouldRender, showDash = true, key },
    column,
  ) => {
    const dash = showDash ? '-' : '';

    return (
      shouldRender && (
        <GridItem
          columns={{ md: column }}
          className={classes.cellWrapper}
          key={key}
        >
          <Box py={3}>
            {type && <Typography type="style-5">{type}</Typography>}
            {(text && <MultilineText text={text} />) || dash}
          </Box>
        </GridItem>
      )
    );
  };

  return subBenefits.map(({ text, panel, nonPanel }, index) => {
    return (
      <Fragment key={`${prefixKey}_${index}`}>
        {renderItemCell(
          index === 0 ? benefitType : '',
          {
            text,
            shouldRender: true,
            showDash: false,
            key: 0,
          },
          columnNameWidth,
        )}
        {[
          { text: panel, shouldRender: !!panelLabel, key: 1 },
          { text: nonPanel, shouldRender: !!nonPanelLabel, key: 2 },
          { text: checkpoint, shouldRender: !!checkpointLabel, key: 3 },
        ].map(value => renderItemCell('', value, otherColumnWidth))}
      </Fragment>
    );
  });
};

BenefitItems.propTypes = {
  subBenefits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  prefixKey: PropTypes.number.isRequired,
  options: PropTypes.shape({
    columnNameWidth: PropTypes.number.isRequired,
    otherColumnWidth: PropTypes.number.isRequired,
    columnsLabel: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  benefitType: PropTypes.string,
  checkpoint: PropTypes.string,
};

BenefitItems.defaultProps = {
  checkpoint: '',
  benefitType: '',
};

export default injectIntl(BenefitItems);
