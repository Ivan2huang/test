import React, { useEffect, useCallback, useContext } from 'react';
import { SingletonRouter } from 'next/router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Head from 'next/head';

import { Box, Card, CardContent, withStyles } from '@material-ui/core';

import CheckOutMethodFormContainer from '../CheckOutMethodFormContainer';
import Loading from '../Loading';
import Grid from '../../../uiComponents/Grid';
import GridItem from '../../../uiComponents/GridItem';
import { orderType } from '../../../types';
import { IntlContext } from '../../../i18n/withIntlProvider';
import { isValidLanguageCode } from '../../../helpers/helpers';
import { getCookie } from '../../../helpers/auth';
import { LANG } from '../../../constants/auth';
import CONFIG from '../../../constants/config';

const styles = theme => ({
  card: {
    marginLeft: -30,
    paddingLeft: 30,
    [theme.breakpoints.up('md')]: {
      paddingRight: 30,
    },
  },
});

const CheckOut = ({
  router: { query },
  getPaymentMethods,
  checkOutOrder,
  goBack,
  callbackUrl,
  order,
  isLoadingPaymentMethods,
  isCheckingOut,
  classes,
  mpgsSessionUrl,
}) => {
  const { amount, currency } = order;
  const setLocale = useContext(IntlContext);

  useEffect(() => {
    const lang = getCookie(LANG);
    const locale = isValidLanguageCode(lang) ? lang : CONFIG.defaultLanguage;

    setLocale(locale);
  }, []);

  useEffect(() => {
    getPaymentMethods({
      clientId: query.query.client_id,
      userId: query.query.user_id,
      amount,
      currency,
      callbackUrl,
    });
  }, [query.query.client_id, query.query.user_id, amount, currency]);

  const onCheckOutOrder = useCallback(
    postOrder => {
      checkOutOrder(
        postOrder,
        query.query.user_id,
        query.query.client_id,
        callbackUrl,
      );
    },
    [query.query.user_id, query.query.client_id, callbackUrl],
  );

  const goBackToCart = () => {
    goBack(callbackUrl);
  };

  return (
    <>
      <Head>
        <script type="text/javascript" src={mpgsSessionUrl} />
      </Head>
      <Box>
        <Card className={classes.card} data-testid="checkout-wrapper">
          <CardContent>
            <Box mt={10} mb={10}>
              <Grid>
                <GridItem columns={{ xs: 12, md: 12 }}>
                  <Box md={{ xs: 12 }}>
                    {isCheckingOut ? (
                      <Loading />
                    ) : (
                      <CheckOutMethodFormContainer
                        checkOutOrder={onCheckOutOrder}
                        isLoadingPaymentMethods={isLoadingPaymentMethods}
                        order={order}
                        goBack={goBackToCart}
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

CheckOut.propTypes = {
  router: PropTypes.shape(SingletonRouter).isRequired,
  getPaymentMethods: PropTypes.func.isRequired,
  checkOutOrder: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  callbackUrl: PropTypes.string.isRequired,
  isLoadingPaymentMethods: PropTypes.bool.isRequired,
  isCheckingOut: PropTypes.bool.isRequired,
  order: orderType.isRequired,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
  }).isRequired,
  mpgsSessionUrl: PropTypes.string.isRequired,
};

export default injectIntl(withStyles(styles)(CheckOut));
