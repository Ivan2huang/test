import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Box, Button, Card, CardContent } from '@material-ui/core';
import Images from '../../../../constants/images';
import { formatMessage, navigateTo } from '../../../../helpers/helpers';
import paths from '../../../../helpers/paths';
import Typography from '../../../../uiComponents/Typography';
import Grid from '../../../../uiComponents/Grid';
import GridItem from '../../../../uiComponents/GridItem';
import NavigationBackButton from '../../../../uiComponents/NavigationBackButton';
import { DETAILS_ID } from '../../constant';

const Success = ({ intl }) => {
  const navigateToDetailsPage = () => navigateTo(paths.common[DETAILS_ID]);

  return (
    <Box
      mt={{
        xs: 3,
        sm: 3,
      }}
    >
      <NavigationBackButton
        testId="back-btn-navigate-details-page"
        onClick={navigateToDetailsPage}
      >
        {formatMessage(
          intl,
          'me.tabs.myDetails.invite.dependent.button.backToMyDetails',
          '< My details',
        )}
      </NavigationBackButton>

      <Card>
        <CardContent>
          <Box mt={{ xs: 0, md: 10 }} mb={10}>
            <Grid>
              <GridItem offset={{ md: 1 }} columns={{ md: 3 }}>
                <img src={Images.INVITE_DEPENDENT_SUCCESS} alt="background" />
              </GridItem>
              <GridItem
                offset={{ sm: 1, md: 1 }}
                columns={{ xs: 12, sm: 10, md: 5 }}
              >
                <Box mb={6}>
                  <Typography type="style-1">
                    {formatMessage(
                      intl,
                      'me.tabs.myDetails.invite.dependent.header.success.title',
                      'Invite sent',
                    )}
                  </Typography>
                </Box>
                <Box mb={4}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'me.tabs.myDetails.invite.dependent.header.success.message',
                      'Ask your dependent to check their email for instructions to create their account',
                    )}
                  </Typography>
                </Box>
                <Box mb={8}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    data-testid="btn-navigate-details-page"
                    onClick={navigateToDetailsPage}
                  >
                    {formatMessage(
                      intl,
                      'me.tabs.myDetails.invite.dependent.button.success',
                      'Back to my details',
                    )}
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

Success.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      dependentName: PropTypes.string,
      dependentEmail: PropTypes.string,
    }),
  }),
};

Success.defaultProps = {
  router: {},
};

export default compose(
  injectIntl,
  withRouter,
)(Success);
