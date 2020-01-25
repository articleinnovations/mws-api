'use strict';

const _ = require('lodash');
const Enum = require('../enum');
const Type = require('../types');

const list = true;
const keyValue = true;
const required = true;


const enums = {
    NotificationTypes() {
        return new Enum(['AnyOfferChanged', 'FeedProcessingFinished', 'FeePromotion', 'FulfillmentOrderStatus', 'ReportProcessingFinished']);
    },
};

const requestDefaults = {
    name: 'Subscriptions',
    group: 'Subscriptions',
    path: '/Subscriptions/2013-07-01',
    version: '2013-07-01'
};

const DestinationType = {
    DeliveryChannel: {name: 'DeliveryChannel'},
    AttributeList:{ name: 'AttributeList', keyValue }
};

const SubscriptionType = {
    NotificationType: {name: 'NotificationType', type: Type.STRING},
    Destination: DestinationType,
    IsEnabled: {name: 'IsEnabled', type: Type.BOOLEAN},
};

const types = {
    ServiceStatus: {
        'GREEN': 'The service is operating normally.',
        'GREEN_I': 'The service is operating normally + additional info provided',
        'YELLOW': 'The service is experiencing higher than normal error rates or degraded performance.',
        'RED': 'The service is unabailable or experiencing extremely high error rates.'
    }
};

const requests = {
    /**
     * Requests the operational status of the Sellers API section.
     */
    GetServiceStatus: {},

    RegisterDestination: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Destination: DestinationType
        }
    },

    DeregisterDestination: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Destination: DestinationType
        }
    },

    ListRegisteredDestinations: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Destination: DestinationType
        }
    },

    SendTestNotificationToDestination: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Destination: DestinationType
        }
    },

    CreateSubscription: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Subscription: SubscriptionType
        }
    },
    GetSubscription: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Destination: DestinationType,
            NotificationType: {name: 'NotificationType', type: Type.STRING},
        }
    },
    DeleteSubscription: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Destination: DestinationType,
            NotificationType: {name: 'NotificationType', type: Type.STRING},
        }
    },
    ListSubscriptions: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
        }
    },
    UpdateSubscription: {
        params: {
            MarketplaceId: {name: 'MarketplaceId'},
            Subscription: SubscriptionType
        }
    }
};

module.exports = {
    requestDefaults,
    requests,
    types
};
