import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Help from './Help';
import Benefits from '../BenefitsContainer';
import { FAQ_ID } from '../constant';
import { getCompanyContactDetailsAndFAQs as getCompanyContactDetailsAndFAQsAction } from './action';
import { loaderDetail } from '../../loader/util';
import LOADER from '../../../constants/loader';
import getLocale from '../../../i18n/getLocale';

const mapStateToProps = ({ benefits, loader }) => ({
  companyContactDetails: benefits.help.companyContactDetails,
  faqs: benefits.help.faqs,
  isWalletsDisabled: benefits.wallets.isWalletsDisabled,
  ...loaderDetail(loader, LOADER.page),
});

const mapDispatchToProps = dispatch => ({
  getCompanyContactDetailsAndFAQs: locale =>
    dispatch(getCompanyContactDetailsAndFAQsAction(locale)),
});

const HelpContainer = ({ intl, getCompanyContactDetailsAndFAQs, ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = getLocale();

  useEffect(() => {
    getCompanyContactDetailsAndFAQs(locale);
    setIsLoaded(true);
  }, [intl]);

  return (
    <Benefits active={FAQ_ID} isLoaded={isLoaded}>
      <Help {...rest} />
    </Benefits>
  );
};

HelpContainer.propTypes = {
  getCompanyContactDetailsAndFAQs: PropTypes.func.isRequired,
  intl: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(HelpContainer));
