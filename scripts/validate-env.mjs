const requiredForProduction = [
  'NODE_ENV',
  'NEXT_PUBLIC_SITE_URL',
];

const recommendedIntegrations = [
  'AUTH_API_URL',
  'WALLET_API_URL',
  'PAYMENT_GATEWAY_BKASH_URL',
  'PAYMENT_GATEWAY_NAGAD_URL',
  'PAYMENT_GATEWAY_ROCKET_URL',
  'KYC_PROVIDER_API_URL',
  'SENTRY_DSN',
];

const failures = [];
for (const key of requiredForProduction) {
  if (!process.env[key]) failures.push(`Missing required environment variable: ${key}`);
}

if (process.env.NEXT_PUBLIC_SITE_URL && !/^https?:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL)) {
  failures.push('NEXT_PUBLIC_SITE_URL must be an absolute URL');
}

if (failures.length) {
  console.error('Environment validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const missingRecommended = recommendedIntegrations.filter((key) => !process.env[key]);
console.log('Environment validation passed.');
if (missingRecommended.length) {
  console.log('Recommended production integrations not set yet:');
  for (const key of missingRecommended) console.log(`- ${key}`);
}
