import { PERMISSIONS, configurationUri, orderUri } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Ignite',
  entryPointUriPath: '${env:CTP_MC_APPLICATION_ENTRY_POINT}',
  cloudIdentifier: '${env:CTP_MC_CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: 'tryzens-ignite-dev',
    },
    production: {
      applicationId: '${env:CTP_MC_APPLICATION_ID}',
      url: 'https://${env:CTP_MC_APPLICATION_URL}',
    },
  },
  headers: {
    csp: {
      'connect-src': ['mc-api.europe-west1.gcp.commercetools.com'],
    },
  },
  oAuthScopes: {
    view: [
      'view_products',
      'view_orders',
      'view_customers',
      'view_key_value_documents',
      'view_stores',
    ],
    manage: [
      'manage_products',
      'manage_orders',
      'manage_customers',
      'manage_key_value_documents',
    ],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Ignite Online Payments',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View, PERMISSIONS.Manage],
  },
  submenuLinks: [
    {
      uriPath: configurationUri,
      defaultLabel: 'Configuration',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View, PERMISSIONS.Manage],
    },
    {
      uriPath: orderUri,
      defaultLabel: 'Orders',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View, PERMISSIONS.Manage],
    },
  ],
  additionalEnv: {
    apiHost: '${env:CTP_MC_APPLICATION_API_HOST}',
  },
};

export default config;
