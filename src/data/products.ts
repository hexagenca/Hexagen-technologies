import { MessageSquareText, ScanSearch, Workflow, BarChart4 } from 'lucide-react'
import type { Product } from '@/types'

export const products: Product[] = [
  {
    slug: 'hexachat',
    name: 'HexaChat',
    tagline: 'A secure AI assistant for your company knowledge',
    description:
      'A secure AI assistant that answers questions using company documents, policies, procedures, and internal knowledge.',
    icon: MessageSquareText,
    color: 'indigo',
    mockup: 'chat',
    features: [
      'Private knowledge base',
      'Context-aware answers',
      'Role-based access',
      'Verifiable source citations',
    ],
    problem:
      'Employees lose hours searching scattered wikis, PDFs, and shared drives for answers that already exist somewhere in the organization. Institutional knowledge stays locked in documents nobody has time to read.',
    capabilities: [
      {
        title: 'Private knowledge base',
        description:
          'HexaChat indexes your internal documents, policies, and procedures into a private, access-controlled knowledge base that never leaves your organization\'s control.',
      },
      {
        title: 'Context-aware answers',
        description:
          'Answers are grounded in your actual content and shaped by the context of the conversation, not generic web knowledge.',
      },
      {
        title: 'Role-based access',
        description:
          'Responses respect the permissions structure already in place, so people only see information relevant and available to their role.',
      },
      {
        title: 'Verifiable source citations',
        description:
          'Every answer links back to the source document or section, so teams can verify accuracy before acting on it.',
      },
    ],
    benefits: [
      'Reduce time spent searching for internal information',
      'Give every team consistent, accurate answers',
      'Preserve institutional knowledge as teams change',
      'Lower the support burden on subject-matter experts',
    ],
    howItWorks: [
      { step: 'Connect knowledge sources', description: 'Securely link internal documents, wikis, and policy repositories.' },
      { step: 'Index and structure content', description: 'HexaChat organizes content while preserving access permissions.' },
      { step: 'Configure roles and guardrails', description: 'Define who can ask what, and how answers should be scoped.' },
      { step: 'Deploy to your teams', description: 'Roll out through web, chat tools, or embedded internal portals.' },
    ],
    useCases: [
      { title: 'HR policy questions', description: 'Employees get instant, accurate answers about benefits, leave, and policy without opening a ticket.' },
      { title: 'IT and onboarding support', description: 'New hires get self-serve answers to common setup and process questions.' },
      { title: 'Internal compliance lookups', description: 'Teams quickly confirm the current version of a procedure before acting.' },
    ],
    security: [
      'Data stays within your controlled environment',
      'Role-based permissions enforced on every query',
      'Full audit trail of questions and sources used',
      'Human oversight for sensitive or ambiguous topics',
    ],
    faqs: [
      {
        question: 'Does HexaChat train on our data to improve other customers\' results?',
        answer: 'No. Your knowledge base and conversations are isolated to your organization and are not used to train shared models.',
      },
      {
        question: 'Can we control which documents HexaChat can access?',
        answer: 'Yes. Access is configured per role, team, or document set, and can be updated at any time.',
      },
      {
        question: 'What happens if HexaChat is unsure of an answer?',
        answer: 'HexaChat is designed to indicate uncertainty and point to the closest source material rather than guessing, and can escalate to a human when appropriate.',
      },
      {
        question: 'How is HexaChat deployed?',
        answer: 'HexaChat can be deployed as a secure web application, embedded into existing internal tools, or connected to common chat platforms depending on your infrastructure.',
      },
    ],
  },
  {
    slug: 'hexadocs',
    name: 'HexaDocs',
    tagline: 'Turn documents into structured, usable data',
    description:
      'An intelligent document-processing platform that extracts, classifies, validates, and summarizes business information.',
    icon: ScanSearch,
    color: 'violet',
    mockup: 'documents',
    features: [
      'Document classification',
      'Information extraction',
      'Automated summarization',
      'Data validation',
    ],
    problem:
      'Invoices, contracts, forms, and reports arrive in inconsistent formats and require manual review before the information inside them can be trusted or used downstream.',
    capabilities: [
      {
        title: 'Document classification',
        description: 'Incoming documents are automatically sorted by type so the right process handles them from the start.',
      },
      {
        title: 'Information extraction',
        description: 'Key fields, tables, and clauses are pulled out of unstructured documents into structured, usable data.',
      },
      {
        title: 'Automated summarization',
        description: 'Long documents are distilled into clear summaries so teams can review faster without losing important detail.',
      },
      {
        title: 'Data validation',
        description: 'Extracted data is checked against business rules to flag inconsistencies before they reach downstream systems.',
      },
    ],
    benefits: [
      'Cut manual document review time',
      'Reduce data entry errors',
      'Speed up approvals that depend on document review',
      'Make historical documents searchable and structured',
    ],
    howItWorks: [
      { step: 'Ingest documents', description: 'Connect email, upload, or storage folders as intake points.' },
      { step: 'Classify and route', description: 'Documents are sorted by type and sent to the correct workflow.' },
      { step: 'Extract and validate', description: 'Fields are extracted and checked against configured business rules.' },
      { step: 'Deliver structured output', description: 'Clean, structured data flows into the systems that need it.' },
    ],
    useCases: [
      { title: 'Invoice processing', description: 'Extract vendor, line items, and totals for faster accounts payable review.' },
      { title: 'Contract review', description: 'Surface key clauses and obligations for legal and procurement teams.' },
      { title: 'Form digitization', description: 'Convert scanned or submitted forms into structured records automatically.' },
    ],
    security: [
      'Document access controlled by role',
      'Encryption of documents in transit and at rest',
      'Configurable retention and deletion policies',
      'Human review checkpoints for low-confidence extractions',
    ],
    faqs: [
      {
        question: 'What document formats does HexaDocs support?',
        answer: 'HexaDocs is designed to work with common business formats including PDFs, scanned images, and standard office document types.',
      },
      {
        question: 'How does HexaDocs handle low-confidence extractions?',
        answer: 'Fields below a configurable confidence threshold are flagged for human review rather than passed through silently.',
      },
      {
        question: 'Can HexaDocs integrate with our existing systems?',
        answer: 'Yes. HexaDocs is built to deliver structured output into business databases, ERPs, and other systems through custom integrations.',
      },
      {
        question: 'How is extracted data validated?',
        answer: 'Extracted values are checked against configurable business rules, such as required fields, formats, and value ranges.',
      },
    ],
  },
  {
    slug: 'hexaflow',
    name: 'HexaFlow',
    tagline: 'Automate the processes that slow your teams down',
    description:
      'An AI workflow automation platform that connects business systems and coordinates repetitive processes.',
    icon: Workflow,
    color: 'blue',
    mockup: 'workflow',
    features: [
      'Process automation',
      'System integrations',
      'Approval workflows',
      'Human-in-the-loop controls',
    ],
    problem:
      'Repetitive, multi-step processes span several systems and people, creating delays, inconsistent handling, and a heavy manual coordination burden.',
    capabilities: [
      {
        title: 'Process automation',
        description: 'Multi-step business processes are automated end-to-end, reducing manual handoffs and delays.',
      },
      {
        title: 'System integrations',
        description: 'HexaFlow connects to the tools and databases your teams already rely on to keep processes moving.',
      },
      {
        title: 'Approval workflows',
        description: 'Structured approval steps ensure the right people review and sign off at the right stage.',
      },
      {
        title: 'Human-in-the-loop controls',
        description: 'Sensitive or ambiguous steps are routed to a person before continuing, keeping people in control of outcomes.',
      },
    ],
    benefits: [
      'Reduce manual coordination across systems',
      'Shorten cycle time on repetitive processes',
      'Create consistent, auditable process execution',
      'Free up staff for higher-value work',
    ],
    howItWorks: [
      { step: 'Map the process', description: 'Define the steps, systems, and decision points involved today.' },
      { step: 'Connect systems', description: 'Integrate the platforms and data sources the process depends on.' },
      { step: 'Configure automation and approvals', description: 'Set rules for what runs automatically and what needs sign-off.' },
      { step: 'Monitor and refine', description: 'Track execution and adjust the workflow as the business changes.' },
    ],
    useCases: [
      { title: 'Employee onboarding', description: 'Coordinate accounts, equipment, and approvals across departments automatically.' },
      { title: 'Vendor and purchase approvals', description: 'Route requests through the right approval chain with full visibility.' },
      { title: 'Customer request handling', description: 'Automatically triage and route incoming requests to the right team.' },
    ],
    security: [
      'Granular permissions on workflow actions',
      'Full execution and approval audit logs',
      'Human-in-the-loop checkpoints for sensitive actions',
      'Configurable data handling per integration',
    ],
    faqs: [
      {
        question: 'Can HexaFlow work alongside our existing systems?',
        answer: 'Yes. HexaFlow is designed to integrate with common business systems rather than replace them.',
      },
      {
        question: 'What happens when a workflow step needs human judgment?',
        answer: 'HexaFlow routes the step to the appropriate person for review and approval before the process continues.',
      },
      {
        question: 'Can we see the history of a completed workflow?',
        answer: 'Yes. Every workflow run is logged with the steps taken, approvals given, and systems involved.',
      },
      {
        question: 'How long does it take to implement a workflow?',
        answer: 'Timelines depend on process complexity and the number of systems involved; our team scopes this during discovery.',
      },
    ],
  },
  {
    slug: 'hexainsights',
    name: 'HexaInsights',
    tagline: 'Ask your business data questions in plain language',
    description:
      'A conversational analytics platform that turns business data into clear answers, reports, and insights.',
    icon: BarChart4,
    color: 'cyan',
    mockup: 'insights',
    features: [
      'Natural-language queries',
      'Automated reports',
      'Dashboard insights',
      'Business intelligence',
    ],
    problem:
      'Business data lives across multiple systems, and getting a clear answer usually means waiting on an analyst or building a report from scratch.',
    capabilities: [
      {
        title: 'Natural-language queries',
        description: 'Ask questions about your business data in plain language and receive direct, relevant answers.',
      },
      {
        title: 'Automated reports',
        description: 'Recurring reports are generated automatically, keeping stakeholders informed without manual effort.',
      },
      {
        title: 'Dashboard insights',
        description: 'Key trends and anomalies are surfaced automatically instead of requiring manual analysis.',
      },
      {
        title: 'Business intelligence',
        description: 'Data from multiple sources is unified into a consistent view for confident decision-making.',
      },
    ],
    benefits: [
      'Get answers from data without waiting on analysts',
      'Improve visibility into business performance',
      'Generate reports faster and more consistently',
      'Support faster, better-informed decisions',
    ],
    howItWorks: [
      { step: 'Connect your data', description: 'Link business databases, spreadsheets, and reporting tools.' },
      { step: 'Model the business context', description: 'Define key metrics, terms, and relationships that matter to your team.' },
      { step: 'Enable natural-language queries', description: 'Teams ask questions directly instead of building queries manually.' },
      { step: 'Automate recurring insights', description: 'Set up scheduled reports and alerts for key metrics.' },
    ],
    useCases: [
      { title: 'Executive reporting', description: 'Generate consistent leadership reports without manual spreadsheet work.' },
      { title: 'Sales performance tracking', description: 'Ask direct questions about pipeline, conversion, and trends.' },
      { title: 'Operational monitoring', description: 'Surface anomalies in operational data as they emerge.' },
    ],
    security: [
      'Access to data scoped by role and permission',
      'Query and access audit logging',
      'Configurable data source connections',
      'Human review for sensitive reporting workflows',
    ],
    faqs: [
      {
        question: 'Does HexaInsights require a data warehouse?',
        answer: 'No, though it can work alongside one. HexaInsights connects to the data sources you already have.',
      },
      {
        question: 'Can HexaInsights answer questions across multiple data sources?',
        answer: 'Yes, when those sources are connected and modeled, HexaInsights can unify them into a single, consistent view.',
      },
      {
        question: 'Who can access which data through HexaInsights?',
        answer: 'Access follows your existing role and permission structure, so people only see data relevant to them.',
      },
      {
        question: 'Can HexaInsights generate scheduled reports automatically?',
        answer: 'Yes. Reports can be configured to run on a schedule and delivered to the right stakeholders.',
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
