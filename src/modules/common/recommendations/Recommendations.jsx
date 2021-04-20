import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

import { Box, Card, withStyles } from '@material-ui/core';
import TrackingButton from '../../../uiComponents/TrackingButton';

import ItemContainer from '../shared/ItemContainer';
import Typography from '../../../uiComponents/Typography';
import { formatAmount, formatMessage } from '../../../helpers/helpers';
import ComponentLoaderAndError from '../shared/ComponentLoaderAndError';
import { CATEGORIES } from '../../../constants/analytics';
import { CURRENCY_MAPPING } from '../../../constants/types';

const RECOMMENDATIONS_COLUMNS = 4;

const Styles = theme => ({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  imageError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.disabled,
  },
  discount: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    paddingTop: 8,
    color: theme.white,
    borderRadius: '50%',
    textAlign: 'center',
    boxSizing: 'border-box',
    backgroundColor: theme.primary,
  },
  discountText: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '16px',
    display: 'block',
  },
  discountTextOff: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  price: {
    textDecoration: 'line-through',
  },
});

const getTrackingRecommendationUrl = (product, position, tipCategory) => {
  const type = tipCategory ? 'lr' : 'lo';
  const queryPrefix = product.url.indexOf('?') !== -1 ? '&' : '?';
  return `${
    product.url
  }${queryPrefix}rec=suggestedoffers&type=${type}&pos=${position + 1}`;
};

const Recommendations = ({
  intl,
  classes,
  loading,
  errorState,
  recommendations,
  getRecommendations,
  tipCategory,
  title,
}) => {
  const displayComponent = recommendations.length > 0 || loading || errorState;

  useEffect(() => {
    getRecommendations(tipCategory);
  }, []);

  if (!displayComponent) return <></>;

  const openRecommendProduct = url => window.open(url, '_self');

  return (
    <Box>
      <Box pb={{ xs: 3, md: 6 }}>
        <Typography type="style-2">{title}</Typography>
      </Box>
      <ComponentLoaderAndError loading={loading} errorState={errorState}>
        <ItemContainer
          numberOfColumns={RECOMMENDATIONS_COLUMNS}
          itemLength={recommendations.length}
        >
          {recommendations.map((recommendation, index) => {
            const trackingUrl = getTrackingRecommendationUrl(
              recommendation,
              index,
              tipCategory,
            );
            const iSpecialPrice =
              recommendation.specialPrice &&
              recommendation.specialPrice !== recommendation.price;

            return (
              <Card key={recommendation.id}>
                <Box height={248} position="relative">
                  {recommendation.imageUrl ? (
                    <Box
                      className={classes.image}
                      onClick={() => openRecommendProduct(trackingUrl)}
                      data-testid={`img-recommendation-${recommendation.id}`}
                    >
                      <img
                        src={recommendation.imageUrl}
                        alt=""
                        className={classes.image}
                      />
                    </Box>
                  ) : (
                    <Box classes={{ root: classes.imageError }}>
                      <Typography type="style-5">
                        {formatMessage(
                          intl,
                          'recommendation.error.image',
                          'Unable to load image',
                        )}
                      </Typography>
                    </Box>
                  )}
                  {recommendation.discount ? (
                    <Box className={classes.discount}>
                      <Typography
                        className={classes.discountText}
                        fontWeight="semiBold"
                      >
                        {`${recommendation.discount}%`}
                      </Typography>
                      <Typography
                        className={
                          (classes.discountText, classes.discountTextOff)
                        }
                      >
                        {formatMessage(
                          intl,
                          'recommendation.discount.off',
                          'off',
                        )}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
                <Box p={6}>
                  <Typography type="style-7" noWrap>
                    {recommendation.name}
                  </Typography>
                  <Typography type="style-6" noWrap>
                    {recommendation.provider}
                  </Typography>
                  <Box pt={7} pb={4}>
                    {iSpecialPrice ? (
                      <>
                        <Typography type="style-6" className={classes.price}>
                          {`${
                            CURRENCY_MAPPING[recommendation.currency]
                          }  ${formatAmount(intl, recommendation.price)}`}
                        </Typography>
                        <Typography type="style-7">
                          {`${
                            CURRENCY_MAPPING[recommendation.currency]
                          }  ${formatAmount(
                            intl,
                            recommendation.specialPrice,
                          )}`}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography type="style-6">&nbsp;</Typography>
                        <Typography type="style-7">
                          {`${
                            CURRENCY_MAPPING[recommendation.currency]
                          }  ${formatAmount(intl, recommendation.price)}`}
                        </Typography>
                      </>
                    )}
                  </Box>
                  <TrackingButton
                    variant="contained"
                    color="primary"
                    onClick={() => openRecommendProduct(trackingUrl)}
                    data-testid={`btn-recommendation-${recommendation.id}`}
                    trackingData={{
                      category: CATEGORIES.MY_LIFESTYLE_OVERVIEW,
                      action: `Click on product recommended ${index}`,
                    }}
                    aria-label={formatMessage(
                      intl,
                      'recommendation.button.viewProductAbout',
                      `View product information about ${recommendation.name}`,
                      { productName: recommendation.name },
                    )}
                  >
                    {formatMessage(
                      intl,
                      'recommendation.button.viewProduct',
                      'View product',
                    )}
                  </TrackingButton>
                </Box>
              </Card>
            );
          })}
        </ItemContainer>
      </ComponentLoaderAndError>
    </Box>
  );
};

Recommendations.defaultProps = {
  tipCategory: undefined,
};

Recommendations.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.exact({
    image: PropTypes.string.isRequired,
    imageError: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    discount: PropTypes.string.isRequired,
    discountText: PropTypes.string.isRequired,
    discountTextOff: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  errorState: PropTypes.bool.isRequired,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      url: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      specialPrice: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
  ).isRequired,
  tipCategory: PropTypes.string,
  getRecommendations: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(Styles)(Recommendations));
