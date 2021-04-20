import React, { useState } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Card,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Hidden,
} from '@material-ui/core';
import WellnessNewsletterModalContainer from './WellnessNewsletterModalContainer';

import { Typography, Grid, GridItem, Switch } from '../../../uiComponents';
import AppVersion from './AppVersion';
import { formatMessage } from '../../../helpers/helpers';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.hyperlink,
    fontWeight: 'bold',
  },
  optLabel: {
    fontWeight: 'bold',
    lineHeight: 24,
  },
}));

const Settings = ({ intl, updateSettings, settings }) => {
  const classes = useStyles();
  const { isEdmOptedOut } = settings;
  const [currentEdmOption, setCurrentEdmOption] = useState(isEdmOptedOut);
  const [
    openWellnessNewsletterModal,
    setOpenWellnessNewsletterModal,
  ] = useState(false);

  const togglePromotionalModal = e => {
    e.preventDefault();
    setOpenWellnessNewsletterModal(!openWellnessNewsletterModal);
  };

  const handleChangeEdmOptOption = ({ target }, isSwitch) => {
    const { value, checked } = target;
    let boolValue = value === 'true';

    if (isSwitch) {
      boolValue = checked;
    }

    setCurrentEdmOption(boolValue);
    updateSettings({
      isEdmOptedOut: boolValue,
    });
  };

  const renderPromotionalLink = testId => {
    return (
      <a
        href="/legal/news-letter"
        onClick={togglePromotionalModal}
        data-testid={testId}
        className={classes.link}
      >
        {formatMessage(
          intl,
          'me.tab.setting.label.field.promotional.link',
          'promotional materials',
        )}
      </a>
    );
  };

  return (
    <>
      <Box>
        <Box mt={4}>
          <Card>
            <Hidden implementation="css" smDown>
              <Grid>
                <GridItem columns={{ xs: 12, md: 5 }}>
                  <Box
                    pl={{ md: 12 }}
                    pt={{ md: 6 }}
                    display="flex"
                    alignItems="flex-start"
                    height="100%"
                  >
                    <Typography>
                      {formatMessage(
                        intl,
                        'me.tab.setting.label.field.promotional',
                        'Promotional materials',
                      )}
                    </Typography>
                  </Box>
                </GridItem>
                <GridItem columns={{ xs: 12, md: 7 }}>
                  <Box pr={{ xs: 0, md: 12 }} pt={6} pb={3}>
                    <Box display="flex" alignItems="center" height={24}>
                      <Typography type="style-10" fontWeight="bold">
                        <FormattedMessage
                          id="me.tab.setting.label.field.promotional.description"
                          defaultMessage="Not receive health, wellness and insurance {promotional}"
                          values={{
                            promotional: renderPromotionalLink(
                              'promotion-link',
                            ),
                          }}
                        />
                      </Typography>
                    </Box>
                    <Box mt={4} mb={4}>
                      <RadioGroup
                        name="EdmOptedOut"
                        value={currentEdmOption}
                        onChange={e => handleChangeEdmOptOption(e, false)}
                        row
                        data-testid="edm-opt-out"
                      >
                        <Box mr={8}>
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={formatMessage(
                              intl,
                              'me.tab.setting.label.field.promotional.no',
                              'No',
                            )}
                          />
                        </Box>
                        <Box>
                          <FormControlLabel
                            value
                            control={<Radio />}
                            label={formatMessage(
                              intl,
                              'me.tab.setting.label.field.promotional.yes',
                              'Yes',
                            )}
                          />
                        </Box>
                      </RadioGroup>
                    </Box>
                  </Box>
                </GridItem>
                <GridItem columns={{ xs: 12 }}>
                  <Divider />
                </GridItem>
              </Grid>
            </Hidden>
            <Hidden implementation="css" mdUp>
              <Box display="flex">
                <Box display="flex" alignItems="center" flex={3}>
                  <Typography type="style-11" fontWeight="bold">
                    <FormattedMessage
                      id="me.tab.setting.label.field.promotional.description"
                      defaultMessage="Not receive health, wellness and insurance {promotional}"
                      values={{
                        promotional: renderPromotionalLink(
                          'promotion-link-mobile',
                        ),
                      }}
                    />
                  </Typography>
                </Box>
                <Box flex={1} display="flex" justifyContent="flex-end">
                  <Switch
                    data-testid="switch-edm-opt-out"
                    checked={currentEdmOption}
                    onChange={e => handleChangeEdmOptOption(e, true)}
                  />
                </Box>
              </Box>
            </Hidden>
          </Card>
        </Box>
        <AppVersion />

        <WellnessNewsletterModalContainer
          open={openWellnessNewsletterModal}
          handleClose={togglePromotionalModal}
        />
      </Box>
    </>
  );
};

Settings.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  updateSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    isEdmOptedOut: PropTypes.bool.isRequired,
  }).isRequired,
};

export default injectIntl(Settings);
