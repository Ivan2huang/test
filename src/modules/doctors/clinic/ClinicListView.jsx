/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Box, withStyles, Button, Link, Hidden } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import { formatMessage, sentenceCase } from '../../../helpers/helpers';
import Images from '../../../constants/images';
import { CLINIC_LIST_VIEW_TYPE, VIEW } from './constants';
import Warning from '../../../icons/Warning';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';
import ScreenReader from '../../../uiComponents/ScreenReader';

const Styles = theme => ({
  itemContainer: {
    background: theme.white,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    margin: `0 ${theme.spacingX(8)} ${theme.spacingX(2)} ${theme.spacingX(8)}`,

    '& > div:nth-child(1)': {
      paddingTop: theme.spacingX(4),
      paddingBottom: theme.spacingX(2),
    },
  },
  buttonViewClinicDetail: {
    height: 'auto',
    padding: `${theme.spacingX(4)} ${theme.spacingX(6)}`,
    justifyContent: 'left',
    '&:hover': {
      background: theme.grey1,
    },

    '& span:nth-child(1)': {
      ...theme.typography['style-6'],
      color: theme.hyperlink,
      fontFamily: theme.typography.fontFamily,
    },
  },
  info: {
    padding: theme.spacingX(6),
    paddingTop: 0,
    borderBottom: `1px solid ${theme.grey1}`,

    '& div:nth-child(1)': {
      ...theme.typography['style-4'],
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
    },

    '& div:nth-child(2), & div:nth-child(3)': {
      ...theme.typography['style-6'],
      fontFamily: theme.typography.fontFamily,
    },
  },
  terminatedContainer: {
    padding: `${theme.spacingX(2)} ${theme.spacingX(4)} 0 ${theme.spacingX(4)}`,
    display: 'flex',
    alignItems: 'center',
  },
  terminatedText: {
    ...theme.typography['style-8'],
    fontFamily: theme.typography.fontFamily,
    color: theme.highEmphasis,
  },
});

const NoClinics = injectIntl(({ intl }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100%"
    textAlign="center"
  >
    <img src={Images.ERROR_BACKGROUND} alt="" height="40%" />
    <Box mt={8}>
      <Typography type="style-1">
        {formatMessage(
          intl,
          'clinic.searchClinics.noClinics.title',
          'No clinics available',
        )}
      </Typography>
    </Box>
    <Box mt={1}>
      <Typography type="style-6">
        {formatMessage(
          intl,
          'clinic.searchClinics.noClinics.description',
          'There are no clinics matching your search criteria.',
        )}
      </Typography>
    </Box>
  </Box>
));

const ClinicListView = ({
  intl,
  classes,
  selectedStackedClinics,
  resultantClinics,
  showClinicDetail,
  view,
  handleOnViewClinicDetailsClick,
  backToResults,
  closeFilterPopup,
}) => {
  const clinics =
    selectedStackedClinics.length > 0
      ? selectedStackedClinics
      : resultantClinics;
  const viewFor =
    selectedStackedClinics.length > 0
      ? CLINIC_LIST_VIEW_TYPE.selectedStackedClinics
      : CLINIC_LIST_VIEW_TYPE.filteredClinics;
  if (clinics.length === 0) {
    return <NoClinics />;
  }

  const key = Math.random();

  const viewDetailButtonText = formatMessage(
    intl,
    'clinic.listView.link.clinicDetails',
    'View clinic details',
  );

  const transformConsulationType = memoize(type => sentenceCase(type));
  const detailButtonClasses = { root: classes.buttonViewClinicDetail };

  // eslint-disable-next-line react/prop-types
  const renderItem = React.forwardRef(({ data, index, style }, ref) => {
    const clinic = data[index];

    return (
      <Box style={style} ref={ref}>
        <div className={classes.itemContainer}>
          <div>
            {!!clinic.terminationDate && (
              <div className={classes.terminatedContainer}>
                <Warning />
                <div className={classes.terminatedText}>
                  {formatMessage(intl, 'clinic.label.terminated', 'Terminated')}
                </div>
              </div>
            )}
          </div>
          <div className={classes.info}>
            <div>{clinic.name}</div>
            <div>{transformConsulationType(clinic.consultationType)}</div>
            <div>{clinic.address}</div>
          </div>
          <Button
            classes={detailButtonClasses}
            onClick={() => {
              handleOnViewClinicDetailsClick(clinic, viewFor);
              logAction({
                category: CATEGORIES.PANEL_CLINIC_PAGE,
                action: 'View clinic details from list',
              });
            }}
            data-testid={`btn-view-clinic-detail-${clinic.id}`}
            fullWidth
            aria-label={formatMessage(
              intl,
              'clinic.listView.link.clinicDetailsFor',
              `View clinic details for ${clinic.name}`,
              { clinic: clinic.name },
            )}
          >
            {viewDetailButtonText}
          </Button>
        </div>
      </Box>
    );
  });

  return (
    <>
      <Hidden
        smDown={showClinicDetail || view === VIEW.map}
        mdUp={showClinicDetail}
        implementation="js"
      >
        <Box
          display="flex"
          width="100%"
          flexDirection="column"
          tabIndex={0}
          onFocus={() => closeFilterPopup()}
        >
          {viewFor === CLINIC_LIST_VIEW_TYPE.selectedStackedClinics && (
            <Box mt={6} mx={8} alignItems="flex-start">
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
          )}
          <Box my={6} mx={8} alignItems="flex-start">
            <Typography type="style-6">
              {viewFor === CLINIC_LIST_VIEW_TYPE.selectedStackedClinics
                ? formatMessage(
                    intl,
                    'clinic.searchClinics.totalStackedClinics',
                    `${clinics.length} clinics at this location`,
                    {
                      totalClinicsFound: clinics.length,
                    },
                  )
                : formatMessage(
                    intl,
                    'clinic.searchClinics.total',
                    `${clinics.length} Clinics / Doctors found`,
                    {
                      totalClinicsFound: clinics.length,
                    },
                  )}
            </Typography>
            <ScreenReader>
              <Typography role="alert" aria-live="polite">
                {`The filter has been applied and the number of clinics/doctors found is ${clinics.length}`}
              </Typography>
            </ScreenReader>
          </Box>
          <Box flex={1}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  key={key}
                  height={height}
                  itemCount={clinics.length}
                  itemData={clinics}
                  width={width}
                >
                  {renderItem}
                </List>
              )}
            </AutoSizer>
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

ClinicListView.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    itemContainer: PropTypes.string.isRequired,
    buttonViewClinicDetail: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    terminatedContainer: PropTypes.string.isRequired,
    terminatedText: PropTypes.string.isRequired,
  }).isRequired,
  selectedStackedClinics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      consultationType: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      terminationDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  resultantClinics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      consultationType: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
  ).isRequired,
  showClinicDetail: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  handleOnViewClinicDetailsClick: PropTypes.func.isRequired,
  backToResults: PropTypes.func.isRequired,
  closeFilterPopup: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(Styles)(ClinicListView));
