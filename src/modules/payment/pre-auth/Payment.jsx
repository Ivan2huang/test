/* eslint-disable react/prop-types */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Head from 'next/head';

import { Box, Card, CardContent, withStyles } from '@material-ui/core';

import AddCardForm from '../AddCardForm';
import Loading from '../Loading';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';

const styles = () => ({
  card: {
    marginLeft: -11,
    paddingLeft: 11,
  },
});

const Payment = ({
  instruments,
  getInstrument,
  preAuthInstrument,
  callbackUrl,
  merchantOrderId,
  isLoadingInstruments,
  router: { query },
  isSubmittingPreAuth,
  classes,
  mpgsSessionUrl,
}) => {
  useEffect(() => {
    getInstrument({
      clientId: query.query.client_id,
      userId: query.query.user_id,
      callbackUrl,
    });
  }, []);

  const onRreAuthInstrument = useCallback(
    instrumentId => {
      preAuthInstrument(
        {
          instrumentId,
          merchantOrderId,
          redirectUrl: callbackUrl,
        },
        query.query.user_id,
        query.query.client_id,
        callbackUrl,
      );
    },
    [
      preAuthInstrument,
      merchantOrderId,
      callbackUrl,
      query.query.user_id,
      query.query.client_id,
      callbackUrl,
    ],
  );

  const onPreAuthAuthNewCard = useCallback(
    sessionId => {
      preAuthInstrument(
        {
          sessionId,
          merchantOrderId,
          redirectUrl: callbackUrl,
        },
        query.query.user_id,
        query.query.client_id,
        callbackUrl,
      );
    },
    [
      preAuthInstrument,
      merchantOrderId,
      callbackUrl,
      query.query.user_id,
      query.query.client_id,
      callbackUrl,
    ],
  );

  return (
    <>
      <Head>
        <script type="text/javascript" src={mpgsSessionUrl} />
      </Head>
      <Box>
        <Card className={classes.card}>
          <CardContent>
            <Box mt={10} mb={10}>
              <Grid>
                <GridItem columns={{ xs: 12 }}>
                  <Box
                    md={{
                      xs: 12,
                    }}
                  >
                    {isSubmittingPreAuth ? (
                      <Loading />
                    ) : (
                      <AddCardForm
                        instruments={instruments}
                        preAuthInstrument={onRreAuthInstrument}
                        submitEnrollInstrument={onPreAuthAuthNewCard}
                        isLoadingInstruments={isLoadingInstruments}
                      />
                    )}
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

Payment.propTypes = {
  instruments: PropTypes.arrayOf(PropTypes.any),
  isLoadingInstruments: PropTypes.bool,
  getInstrument: PropTypes.func.isRequired,
  preAuthInstrument: PropTypes.func,
  callbackUrl: PropTypes.string,
  isSubmittingPreAuth: PropTypes.bool,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
  }).isRequired,
  mpgsSessionUrl: PropTypes.string,
};

Payment.defaultProps = {
  isLoadingInstruments: true,
  isSubmittingPreAuth: false,
  preAuthInstrument: () => {},
  instruments: [],
  callbackUrl: '',
  mpgsSessionUrl: '',
};

export default injectIntl(withStyles(styles)(Payment));
