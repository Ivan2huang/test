import React, { useEffect, useContext } from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';

import { Box, Button, withStyles } from '@material-ui/core';

import { formatMessage, isValidLanguageCode } from '../../../helpers/helpers';
import Typography from '../../../uiComponents/Typography';
import CompanyContactDetails from '../../benefits/help/CompanyContactDetails';
import { IntlContext } from '../../../i18n/withIntlProvider';
import getLocale from '../../../i18n/getLocale';

const Styles = {
  backButton: {
    zIndex: 10,
  },
};

const ContactUs = ({ intl, classes, getContactInfo, contactInfo }) => {
  const { query } = useRouter();
  const setLocale = useContext(IntlContext);
  const locale = isValidLanguageCode(query.lang) ? query.lang : getLocale();

  useEffect(() => {
    getContactInfo(locale);
    setLocale(locale);
  }, [intl]);

  return (
    <Box display="flex" flexDirection="column">
      <Typography type="style-2">
        {formatMessage(intl, 'contactUs.label.contactUs', 'Contact Us')}
      </Typography>
      <Box pt={5} display="flex" flexDirection="row">
        <CompanyContactDetails companyContactDetails={contactInfo} />
      </Box>
      <Box pt={8} pb={8}>
        <Button
          data-testid="btn-back-to-previous-page"
          variant="contained"
          color="primary"
          className={classes.backButton}
          onClick={Router.back}
        >
          {formatMessage(intl, 'error.button.goback', 'Go back')}
        </Button>
      </Box>
    </Box>
  );
};

ContactUs.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  getContactInfo: PropTypes.func.isRequired,
  contactInfo: PropTypes.shape({}),
  classes: PropTypes.shape({
    backButton: PropTypes.string,
  }).isRequired,
};

ContactUs.defaultProps = {
  contactInfo: {
    email: 'emiL',
    phone: 'PHONE',
    customerSupportHours: '11-233 ASDASD AD',
  },
};

export default withStyles(Styles)(injectIntl(ContactUs));
