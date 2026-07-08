export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  paymobApiKey: process.env.PAYMOB_API_KEY ?? "",
  paymobIntegrationId: process.env.PAYMOB_INTEGRATION_ID ?? "",
  fawryMerchantCode: process.env.FAWRY_MERCHANT_CODE ?? "",
  fawrySecurityKey: process.env.FAWRY_SECURITY_KEY ?? "",
};
