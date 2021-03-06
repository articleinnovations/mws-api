'use strict';

const _ = require('lodash');
const Enum = require('../enum');
const Type = require('../types');

const list = true;
const required = true;

const requestDefaults = {
    name: 'Products',
    group: 'Products',
    path: '/Products/2011-10-01',
    version: '2011-10-01'
};

const enums = {
    ItemConditions() {
        return new Enum([ 'New', 'Used', 'Collectible', 'Refurbished', 'Club' ]);
    }
};

const types = {
    CompetitivePriceId: {
        '1': 'New Buy Box Price',
        '2': 'Used Buy Box Price'
    },
    ServiceStatus: {
        'GREEN':'The service is operating normally.',
        'GREEN_I':'The service is operating normally + additional info provided',
        'YELLOW':'The service is experiencing higher than normal error rates or degraded performance.',
        'RED':'The service is unabailable or experiencing extremely high error rates.'
    }
};

const requests = {
    /**
     * Requests the operational status of the Products API section.
     */
    GetServiceStatus: {},

    /**
     * Returns a list of products and their attributes, ordered by relevancy,
     * based on a search query that you specify
     */
    ListMatchingProducts: {
        params: {
            MarketplaceId: { required },
            Query: { required },
            QueryContextId: {}
        }
    },

    /**
     * Returns a list of products and their attributes,
     * based on a list of ASIN values that you specify
     */
    GetMatchingProduct: {
        params: {
            MarketplaceId: { required },
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns a list of products and their attributes,
     * based on a list of specified ID values that you specify
     */
    GetMatchingProductForId: {
        params: {
            MarketplaceId: { required },
            IdType: { required },
            IdList: { name: 'IdList.Id', list, required }
        }
    },

    /**
     * Returns the current competitive pricing of a product,
     * based on the SellerSKU and MarketplaceId that you specify
     */
    GetCompetitivePricingForSKU: {
        params: {
            MarketplaceId: { required },
            SellerSKUList: { name: 'SellerSKUList.SellerSKU', list, required }
        }
    },

    /**
     * Same as above, except that it uses a MarketplaceId and an ASIN to uniquely
     * identify a product, and it does not return the SKUIdentifier element
     */
    GetCompetitivePricingForASIN: {
        params: {
            MarketplaceId: { required },
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns the lowest price offer listings for a specific product by item condition.
     */
    GetLowestOfferListingsForSKU: {
        params: {
            MarketplaceId: { required },
            ItemCondition: {},
            SellerSKUList: { name: 'SellerSKUList.SellerSKU', list, required }
        }
    },

    /**
     * Same as above but by a list of ASIN's you provide
     */
    GetLowestOfferListingsForASIN: {
        params: {
            MarketplaceId: { required },
            ItemCondition: {},
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns the product categories that a product belongs to,
     * including parent categories back to the root for the marketplace
     */
    GetProductCategoriesForSKU: {
        params: {
            MarketplaceId: { required },
            SellerSKU: { required }
        }
    },

    /**
     * Same as above, except that it uses a MarketplaceId and an ASIN to
     * uniquely identify a product.
     */
    GetProductCategoriesForASIN: {
        params: {
            MarketplaceId: { required },
            ASIN: { required }
        }
    },

    /**
     * Returns pricing information for your own offer listings, based on ASIN.
     *
     */
    GetMyPriceForASIN: {
        params: {
            MarketplaceId: { required },
            ASINList: { name: 'ASINList.ASIN', list, required }
        }
    },

    /**
     * Returns pricing information for your own offer listings,
     * based on SellerSKU.
     */
    GetMyPriceForSKU: {
        params: {
            MarketplaceId: { required },
            SellerSKUList: { name: 'SellerSKUList.SellerSKU', list, required }
        }
    },
    /**
     * Takes a list of products and marketplaces returns the fees for those
     * products in those marketplaces. Products must be identified by ASIN or
     * SellerSKU.
     */
     // Problem trying to support batching for this API: it uses a list of objects, and the method in request.js
     // that builds lists for XML (xxx.1.yyy, xxx.2.yyy) isn't set up to support lists of objects, so for example
     // we need to have ...1.IdType, ...1.IdValue, ...2.IdType, ...2.IdValue, etc. but the library can really only
     // do something like ...IdType.1, ...IdValue.1, etc.
    GetMyFeesEstimate: {
        params: {
            MarketplaceId: { name:'FeesEstimateRequestList.FeesEstimateRequest.1.MarketplaceId', required },
            IdType: { name:'FeesEstimateRequestList.FeesEstimateRequest.1.IdType', required },
            IdValue: { name:'FeesEstimateRequestList.FeesEstimateRequest.1.IdValue', required },
            IsAmazonFulfilled: { name:'FeesEstimateRequestList.FeesEstimateRequest.1.IsAmazonFulfilled', required },
            Identifier: { name:'FeesEstimateRequestList.FeesEstimateRequest.1.Identifier', required },
            CurrencyCode: { name:'FeesEstimateRequestList.FeesEstimateRequest.1.PriceToEstimateFees.ListingPrice.CurrencyCode', required },
            PriceToEstimateFees: { name:'FeesEstimateRequestList.FeesEstimateRequest.1.PriceToEstimateFees.ListingPrice.Amount', required },
            // FeesEstimateRequestList: { name:'FeesEstimateRequestList.FeesEstimateRequest', list, required }
        },
        data: 'FeesEstimateResultList.FeesEstimateResult.FeesEstimate'
    },

    /**
     * Takes an ASIN and returns a list of the 20 lowest priced offers for that product.
     */
    GetLowestPricedOffersForASIN: {
      params: {
        MarketplaceId: { required },
        ASIN: { required },
        ItemCondition: { required },
      },
    },

    /**
     * Same as above but with SKU instead of ASIN.
     */
    GetLowestPricedOffersForSKU: {
      params: {
        MarketplaceId: { required },
        SellerSKU: { required },
        ItemCondition: { required },
      },
    }
};

module.exports = {
    enums,
    requestDefaults,
    requests,
    types
};
