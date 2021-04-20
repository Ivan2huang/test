/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core';
import Typography from '../../../../uiComponents/Typography';
import { benefitNameToKey } from '../helper';
import { logAction } from '../../../../helpers/firebase';
import { CATEGORIES } from '../../../../constants/analytics';

const useStyles = makeStyles(() => ({
  productLink: {
    textDecoration: 'none',
    display: 'block',
  },
}));

const BenefitIndex = ({ benefitList, selectedBenefit, members }) => {
  const classes = useStyles();

  const trackingLinkAction = (event, benefitName) => {
    const items = members.filter(item => item.memberId === selectedBenefit);
    logAction({
      category: CATEGORIES.BENEFITS_PAGE,
      action: `${benefitName} for ${items[0].relationship}`,
    });
  };

  return benefitList.map(
    ({ benefitName, benefitType = benefitNameToKey(benefitName) }) => (
      <Typography
        onClick={e => trackingLinkAction(e, benefitName)}
        key={`link-${benefitType}`}
        href={`#${benefitType}`}
        type="style-4"
        color="hyperlink"
        className={classes.productLink}
        component="a"
        data-testid={`product-link-${benefitType}`}
      >
        {benefitName}
      </Typography>
    ),
  );
};

BenefitIndex.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  benefitList: PropTypes.arrayOf(PropTypes.shape({})),
  selectedBenefit: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.shape({})),
};

BenefitIndex.defaultProps = {
  selectedBenefit: '',
  benefitList: [],
  members: [],
};

export default injectIntl(BenefitIndex);
