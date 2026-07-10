export const company = {
  name: 'Hexagen',
  legalName: 'Hexagen',
  slogan: 'Innovate. Integrate. Elevate.',
  foundedYear: 2022,
  country: 'Canada',
  phone: '+1 514-862-0059',
  phoneHref: 'tel:+15148620059',
  email: 'admin@hexagen.ca',
  supportEmail: 'support@hexagen.ca',
  address: {
    street: '302 Edenbrook Hill Dr',
    region: 'Ontario',
    country: 'Canada',
    postalCode: 'L7A 2L7',
    full: '302 Edenbrook Hill Dr, Ontario, Canada, L7A 2L7',
  },
  // NOTE: placeholder social link — replace with the real Hexagen LinkedIn URL before launch.
  linkedin: 'https://www.linkedin.com/company/hexagen',
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://www.hexagen.ca',
} as const
