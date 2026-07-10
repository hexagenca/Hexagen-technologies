import type { CaseStudy } from '@/types'

/**
 * SAMPLE / ILLUSTRATIVE PROJECT — NOT A VERIFIED CUSTOMER CASE STUDY.
 *
 * This content is a placeholder that illustrates the shape of a Hexagen
 * engagement. Replace every field below with verified customer information,
 * a real quote (with permission), and confirmed outcomes before treating
 * this as a published case study. `isSample: true` also drives the visible
 * "Sample Project" label rendered in the UI.
 */
export const featuredCaseStudy: CaseStudy = {
  isSample: true,
  industry: 'Professional services (illustrative)',
  challenge:
    'A mid-sized professional services firm had internal policies and procedures spread across shared drives, email threads, and an outdated wiki. Staff regularly interrupted subject-matter experts with repeat questions, and onboarding new employees took longer than it should have.',
  solution:
    'Hexagen implemented HexaChat as a private knowledge assistant connected to the firm\'s policy documents, procedures, and internal wikis, with role-based access matching their existing permission structure.',
  implementation: [
    'Discovery workshops to identify the highest-friction knowledge gaps',
    'Secure connection of policy documents, procedure guides, and internal wikis',
    'Role-based access configuration aligned to existing team structures',
    'Pilot rollout with a single department before company-wide deployment',
  ],
  outcome: [
    'Illustrative outcome: fewer repeat questions reaching subject-matter experts',
    'Illustrative outcome: faster onboarding for new employees',
    'Illustrative outcome: more consistent policy answers across departments',
  ],
  quote: {
    text: 'This is placeholder quote text illustrating the tone of a customer testimonial. Replace with a real, permissioned customer quote before publishing.',
    role: 'Placeholder role, illustrative project',
  },
  technologies: ['HexaChat', 'Secure document indexing', 'Role-based access control'],
}
