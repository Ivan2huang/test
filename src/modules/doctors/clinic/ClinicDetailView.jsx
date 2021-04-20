/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Box,
  Card,
  Divider,
  Hidden,
  Link,
  withStyles,
} from '@material-ui/core';
import { injectIntl } from 'react-intl';

import Typography from '../../../uiComponents/Typography';
import NotificationBox from '../../../uiComponents/NotificationBox';
import { formatMessage, sentenceCase } from '../../../helpers/helpers';
import WarningLg from '../../../icons/WarningLg';
import { trackingAnchor } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const Styles = theme => ({
  itemContainer: {
    background: theme.white,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    marginBottom: theme.spacingX(20),
  },
  teleTag: {
    textDecoration: 'none',
    color: theme.mediumEmphasis,
    '&:not(:last-child)::after': {
      content: '", "',
    },
  },
  terminatedItemContainer: {
    marginBottom: theme.spacingX(2),
  },
});

const renderTerminationLabelOfClinicDetail = (intl, classes) => {
  return (
    <NotificationBox className={classes.terminatedItemContainer}>
      <Box pr={2}>
        <WarningLg />
      </Box>
      <Typography type="style-6">
        {formatMessage(
          intl,
          'clinic.detailView.terminationInfo',
          `Terminated. This clinic is no longer part of the panel clinic list and may not be covered.`,
        )}
      </Typography>
    </NotificationBox>
  );
};

const renderAddressSection = (
  classes,
  name,
  consultationType,
  contactNumbers,
  address,
) => (
  <Box p={6}>
    <Box pb={1} component={Typography} type="style-4">
      {name}
    </Box>
    <Box pb={1} component={Typography} type="style-6">
      {sentenceCase(consultationType)}
    </Box>
    <Box pb={1} component={Typography} type="style-6">
      {contactNumbers
        .filter(number => number && number !== '')
        .map(number => (
          <a
            key={number}
            href={`tel:${number}`}
            onClick={trackingAnchor}
            className={classes.teleTag}
            data-category={CATEGORIES.PANEL_CLINIC_DETAIL}
            data-action="Call clinic from clinic details"
          >
            {number}
          </a>
        ))}
    </Box>
    <Box component={Typography} type="style-6">
      {address}
    </Box>
  </Box>
);

const renderAvailabilitySection = (intl, appointmentType) =>
  appointmentType && (
    <>
      <Divider />
      <Box p={6}>
        <Box pb={1} component={Typography} type="style-6">
          {formatMessage(
            intl,
            'clinic.detailView.availability',
            'Availability',
          )}
        </Box>
        <Typography type="style-5">{appointmentType}</Typography>
      </Box>
    </>
  );

const renderConsultationTime = (days, id) => (
  <Box mb={4} key={`${id}-consultationDay`}>
    <Box pb={1} component={Typography} type="style-6">
      {Object.keys(days)[0]}
    </Box>
    {Object.values(days)[0].map((timeSlot, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Typography key={`${index}-consultationSlot`} type="style-5">
        {timeSlot}
      </Typography>
    ))}
  </Box>
);

const renderConsultationTimingSection = (intl, consultationTimings, peakHour) =>
  !(consultationTimings || peakHour) ? (
    ''
  ) : (
    <>
      <Divider />
      <Box px={6} pt={6} pb={2}>
        {consultationTimings &&
          consultationTimings.map((days, index) =>
            renderConsultationTime(days, index),
          )}
        {peakHour && (
          <Box mb={4}>
            <Box pb={1} component={Typography} type="style-6">
              {formatMessage(intl, 'clinic.detailView.peakHours', 'Peak hours')}
            </Box>
            <Typography type="style-5">{peakHour}</Typography>
          </Box>
        )}
      </Box>
    </>
  );

const renderLanguageSection = (intl, language) =>
  language && (
    <>
      <Divider />
      <Box p={6}>
        <Box pb={1} component={Typography} type="style-6">
          {formatMessage(
            intl,
            'clinic.detailView.languageSpoken',
            'Language(s) spoken',
          )}
        </Box>
        <Typography type="style-5">{language}</Typography>
      </Box>
    </>
  );

const renderClinicDetails = (intl, classes, clinic) => {
  return (
    <>
      {renderAddressSection(
        classes,
        clinic.name,
        clinic.consultationType,
        [clinic.contactNumber1, clinic.contactNumber2, clinic.contactNumber3],
        clinic.address,
        clinic.terminationDate,
        intl,
      )}
      {renderAvailabilitySection(intl, clinic.appointmentType)}
      {renderConsultationTimingSection(
        intl,
        clinic.consultationTimings,
        clinic.peakHour,
      )}
      {renderLanguageSection(intl, clinic.language)}
    </>
  );
};

const ClinicDetailView = ({
  intl,
  classes,
  clinic,
  showClinicDetail,
  backToResults,
}) => {
  if (!clinic.id) return <></>;
  return (
    <>
      <Box
        component={Hidden}
        implementation="css"
        xsUp={!showClinicDetail}
        flex={1}
        mx={8}
      >
        <Box py={6} alignItems="flex-start">
          <Link
            data-testid="btn-back-to-results"
            underline="none"
            component="button"
            onClick={backToResults}
          >
            <Typography type="style-6" color="hyperlink">
              {formatMessage(
                intl,
                'clinic.detailView.clinicDetails',
                'Back to results',
              )}
            </Typography>
          </Link>
        </Box>

        {!!clinic.terminationDate &&
          renderTerminationLabelOfClinicDetail(intl, classes)}

        <Box component={Card} classes={{ root: classes.itemContainer }}>
          {renderClinicDetails(intl, classes, clinic)}
        </Box>
      </Box>
    </>
  );
};

ClinicDetailView.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    itemContainer: PropTypes.string.isRequired,
    teleTag: PropTypes.string.isRequired,
    terminatedItemContainer: PropTypes.string.isRequired,
  }).isRequired,
  clinic: PropTypes.shape({}),
  showClinicDetail: PropTypes.bool.isRequired,
  backToResults: PropTypes.func.isRequired,
};

ClinicDetailView.defaultProps = {
  clinic: {},
};

export default injectIntl(withStyles(Styles)(ClinicDetailView));
