import React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import { Box, Card, CardContent, withStyles, Button } from '@material-ui/core';

import Images from '../../../constants/images';
import { formatMessage, navigateTo } from '../../../helpers/helpers';
import paths from '../../../helpers/paths';
import Typography from '../../../uiComponents/Typography';
import ButtonGroup from '../../../uiComponents/ButtonGroup';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';

const Styles = () => ({
  image: {
    width: '100%',
  },
});

const Success = ({ intl, classes }) => {
  const navigateToClaims = () => {
    navigateTo(paths.common.claims);
  };
  const navigateToMakeClaim = () => {
    navigateTo(paths.employee.makeClaim);
  };

  return (
    <Box
      mt={{
        xs: 3,
        sm: 14,
      }}
    >
      <Card>
        <CardContent>
          <Box mt={10} mb={10}>
            <Grid>
              <GridItem offset={{ md: 1 }} columns={{ md: 3 }}>
                <img
                  src={Images.SUCCESS_CLAIM_BACKGROUND}
                  alt="success claim background"
                  className={classes.image}
                />
              </GridItem>
              <GridItem
                offset={{ sm: 1, md: 1 }}
                columns={{ xs: 12, sm: 10, md: 5 }}
              >
                <Box mb={8}>
                  <Typography type="style-1">
                    {formatMessage(
                      intl,
                      'claims.makeClaimSuccess.title',
                      'Claim submitted',
                    )}
                  </Typography>
                </Box>
                <Box mb={8}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'claims.makeClaimSuccess.description',
                      'Thank you. Please keep your original documents for at least 6 months. Your claim will be settled in 14 days.',
                    )}
                  </Typography>
                </Box>
                <Box mb={8}>
                  <Typography type="style-6">
                    {formatMessage(
                      intl,
                      'claims.makeClaimSuccess.disclaimer',
                      'Your claim might take 2-3 days before it shows up in the claims list.',
                    )}
                  </Typography>
                </Box>
                <ButtonGroup>
                  <Button
                    data-testid="btn-back-to-claims"
                    variant="contained"
                    color="primary"
                    onClick={navigateToClaims}
                  >
                    {formatMessage(
                      intl,
                      'claims.makeClaimSuccess.button.backToClaims',
                      'Back to claims',
                    )}
                  </Button>
                  <Button
                    data-testid="btn-make-another-claim"
                    variant="outlined"
                    color="secondary"
                    onClick={navigateToMakeClaim}
                  >
                    {formatMessage(
                      intl,
                      'claims.makeClaimSuccess.button.makeAnotherClaim',
                      'Make another claim',
                    )}
                  </Button>
                </ButtonGroup>
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
  classes: PropTypes.exact({
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withStyles(Styles),
)(Success);
