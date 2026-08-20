export const REPORT_TYPES = [
  {
    value: 'suggestion',
    label: 'Sugestão',
    icon: '💡',
    description: 'Uma ideia para melhorar processos, atendimento ou ambiente.',
  },
  {
    value: 'praise',
    label: 'Elogio',
    icon: '😊',
    description: 'Reconheça uma atitude, pessoa, equipe ou experiência positiva.',
  },
  {
    value: 'complaint',
    label: 'Reclamação',
    icon: '⚠️',
    description: 'Relate algo que não funcionou bem ou precisa de atenção.',
  },
  {
    value: 'report',
    label: 'Denúncia',
    icon: '🚨',
    description: 'Informe uma conduta, risco ou situação que precisa ser apurada.',
  },
] as const

export type ReportType = (typeof REPORT_TYPES)[number]['value']

export const REPORT_AREAS = [
  'Administrativo',
  'Comercial',
  'Marketing',
  'Cadastro',
  'Compras',
  'Logística',
  'Financeiro',
  'RH',
  'Liderança/Gestão',
  'Ambiente de trabalho',
  'Assédio ou discriminação',
  'Segurança',
  'Fraude ou irregularidade',
  'Outro',
] as const

export type ReportArea = (typeof REPORT_AREAS)[number]

export const IDENTITY_MODES = [
  {
    value: 'anonymous',
    label: 'Quero permanecer anônimo',
    description: 'Nenhuma identificação pessoal será solicitada.',
  },
  {
    value: 'confidential',
    label: 'Quero me identificar de forma confidencial',
    description: 'Sua identidade ficará restrita às pessoas autorizadas a tratá-la.',
  },
  {
    value: 'identified',
    label: 'Posso me identificar',
    description: 'Seu nome poderá ser utilizado no tratamento quando necessário.',
  },
] as const

export type IdentityMode = (typeof IDENTITY_MODES)[number]['value']

export const CONTACT_METHODS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'E-mail' },
  { value: 'in_person', label: 'Conversar pessoalmente' },
] as const

export type ContactMethod = (typeof CONTACT_METHODS)[number]['value']

export const URGENCY_OPTIONS = [
  { value: 'no', label: 'Não' },
  { value: 'yes', label: 'Sim, existe uma situação urgente' },
  { value: 'unsure', label: 'Não tenho certeza' },
] as const

export type UrgencyOption = (typeof URGENCY_OPTIONS)[number]['value']
