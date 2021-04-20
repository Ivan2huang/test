import React, { useEffect, useCallback, useState } from 'react';
import { SingletonRouter } from 'next/router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, Card, CardContent, withStyles } from '@material-ui/core';

import MultiPocessorsCheckOutForm from '../multi-processors-check-out-form';
import Loading from '../Loading';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import { orderType } from '../../../types';
import { loadScript } from '../util';

const styles = theme => ({
  card: {
    marginLeft: -30,
    paddingLeft: 30,
    [theme.breakpoints.up('md')]: {
      paddingRight: 30,
    },
  },
});

const Purchase = ({
  router: { query },
  classes,
  isLoadingPaymentMethods,
  isMakingPayment,
  order,
  mpgsSessionUrl,
  paymentMethods,
  extData,
  getPaymentPurchaseMethods,
  makePayment,
}) => {
  const [isLoadingScript, setIsLoadingScript] = useState(true);
  const {
    query: { callbackUrl },
  } = query;

  useEffect(() => {
    if (mpgsSessionUrl) {
      loadScript(mpgsSessionUrl, () => {
        setIsLoadingScript(false);
      });
    } else if (!isLoadingPaymentMethods) {
      setIsLoadingScript(false);
    }
  }, [mpgsSessionUrl, isLoadingPaymentMethods]);

  useEffect(() => {
    if (query.query.purchaseId) {
      getPaymentPurchaseMethods(query.query.purchaseId, callbackUrl);
    }
  }, [query.query.purchaseId]);

  const onCheckOutOrder = useCallback(
    postOrder => {
      makePayment({
        purchaseId: query.query.purchaseId,
        order: postOrder,
        callbackUrl,
      });
    },
    [query.query.purchaseId, callbackUrl],
  );

  const isLoading = isLoadingPaymentMethods || isLoadingScript;

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Box>
        <Card className={classes.card} data-testid="checkout-wrapper">
          <CardContent>
            <Box mt={10} mb={10}>
              <Grid>
                <GridItem columns={{ xs: 12, md: 12 }}>
                  <Box md={{ xs: 12 }}>
                    {isMakingPayment ? (
                      <Loading />
                    ) : (
                      <MultiPocessorsCheckOutForm
                        checkOutOrder={onCheckOutOrder}
                        isLoadingPaymentMethods={isLoading}
                        order={order}
                        paymentMethods={paymentMethods}
                        extData={extData}
                        callbackUrl={callbackUrl}
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

Purchase.propTypes = {
  router: PropTypes.shape(SingletonRouter).isRequired,
  getPaymentPurchaseMethods: PropTypes.func.isRequired,
  makePayment: PropTypes.func.isRequired,
  isLoadingPaymentMethods: PropTypes.bool.isRequired,
  isMakingPayment: PropTypes.bool.isRequired,
  order: orderType.isRequired,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
  }).isRequired,
  mpgsSessionUrl: PropTypes.string.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  extData: PropTypes.shape({
    allowSaveAsset: PropTypes.bool,
    allowPayOptionWithoutWallet: PropTypes.bool,
    paymentFootnote: PropTypes.string,
    paymentInstructionSufficient: PropTypes.string,
    paymentInstructionInsufficient: PropTypes.string,
  }).isRequired,
};

export default injectIntl(withStyles(styles)(Purchase));
