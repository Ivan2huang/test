import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { withStyles } from '@material-ui/core';

import ContactItem from './ContactItem';

import Typography from '../../../uiComponents/Typography';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import { PhoneIcon, MailIcon } from '../../../icons/me';
import { formatMessage } from '../../../helpers/helpers';
import { CATEGORIES } from '../../../constants/analytics';
import { trackingAnchor } from '../../../helpers/firebase';

const Styles = theme => ({
  teleTag: {
    textDecoration: 'none',
    color: theme.hyperlink,
  },
  mailTag: {
    color: theme.hyperlink,
    textDecoration: 'none',
  },
  otherEnquiries: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacingX(7),
    },
  },
  customerSupportHoursContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: `0px ${theme.spacingX(1)}`,
    [theme.breakpoints.up('md')]: {
      padding: `0px ${theme.spacingX(3)}`,
    },
  },
  customerSupportHours: {
    paddingTop: theme.spacingX(8),
  },
  supportLocation: {
    paddingTop: theme.spacingX(4),
  },
  noteHeader: {
    paddingTop: theme.spacingX(6),
  },
});

const CompanyContactDetails = ({ classes, companyContactDetails, intl }) => {
  const {
    phones,
    email,
    technicalEmail,
    customerSupportHours,
    note,
  } = companyContactDetails;
  const hasPhone = phones && phones.length > 0;
  const hasEmail = email;
  const hasCustomerSupportHours =
    customerSupportHours && customerSupportHours.length > 0;

  return (
    <Grid>
      {(hasPhone || hasEmail) && (
        <GridItem columns={{ xs: 12, md: 6 }}>
          <Grid>
            <GridItem columns={{ xs: 12, md: 12 }}>
              <Typography type="style-9">
                {formatMessage(
                  intl,
                  'me.tabs.help.companyDetails.medicalEnquiries',
                  'Medical enquiries',
                )}
              </Typography>
            </GridItem>
            {phones &&
              phones.map(({ number, location }, index) => (
                <ContactItem
                  {...{
                    key: index,
                    icon: <PhoneIcon />,
                    href: `tel:${number}`,
                    display: `${number} (${location})`,
                    classeName: classes.teleTag,
                    onClick: trackingAnchor,
                    tracking: {
                      category: CATEGORIES.HELP_PAGE,
                      action: 'Call help',
                    },
                  }}
                />
              ))}
            {email && (
              <ContactItem
                {...{
                  icon: <MailIcon />,
                  href: `mailto:${email}`,
                  display: `${email}`,
                  classeName: classes.mailTag,
                  onClick: trackingAnchor,
                  tracking: {
                    category: CATEGORIES.HELP_PAGE,
                    action: 'Email help',
                  },
                }}
              />
            )}
          </Grid>
        </GridItem>
      )}
      {technicalEmail && (
        <GridItem columns={{ xs: 12, md: 6 }}>
          <Grid>
            <GridItem columns={{ xs: 12, md: 12 }}>
              <Typography type="style-9" className={classes.otherEnquiries}>
                {formatMessage(
                  intl,
                  'me.tabs.help.companyDetails.otherEnquiries',
                  'Other enquiries',
                )}
              </Typography>
            </GridItem>
            <ContactItem
              {...{
                icon: <MailIcon />,
                href: `mailto:${technicalEmail}`,
                display: `${technicalEmail}`,
                classeName: classes.mailTag,
                onClick: trackingAnchor,
                tracking: {
                  category: CATEGORIES.HELP_PAGE,
                  action: 'Email help',
                },
              }}
            />
          </Grid>
        </GridItem>
      )}
      <div className={classes.customerSupportHoursContainer}>
        {hasCustomerSupportHours && (
          <>
            <Typography type="style-9" className={classes.customerSupportHours}>
              {formatMessage(
                intl,
                'me.tabs.help.companyDetails.supportHours.header',
                'Customer support hours',
              )}
            </Typography>
            {customerSupportHours.map(({ hour, location }, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  <Typography
                    type="style-6"
                    color="black"
                    className={classes.supportLocation}
                  >
                    {location}
                  </Typography>
                  <Typography type="style-6">
                    {hour.split(/\n|\\n/).map((line, lineIndex) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return <div key={`${index}-${lineIndex}`}>{line}</div>;
                    })}
                  </Typography>
                </Fragment>
              );
            })}
          </>
        )}
        {note && (
          <>
            <Typography
              type="style-10"
              color="black"
              className={classes.noteHeader}
            >
              {formatMessage(
                intl,
                'me.tabs.help.companyDetails.label.note',
                'Notes',
              )}
            </Typography>
            <Typography type="style-10">{note}</Typography>
          </>
        )}
      </div>
    </Grid>
  );
};

CompanyContactDetails.propTypes = {
  companyContactDetails: PropTypes.shape({}).isRequired,
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    teleTag: PropTypes.string.isRequired,
    mailTag: PropTypes.string.isRequired,
    otherEnquiries: PropTypes.string.isRequired,
    customerSupportHoursContainer: PropTypes.string.isRequired,
    customerSupportHours: PropTypes.string.isRequired,
    supportLocation: PropTypes.string.isRequired,
    noteHeader: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(withStyles(Styles)(CompanyContactDetails));
