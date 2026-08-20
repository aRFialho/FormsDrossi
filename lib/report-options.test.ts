import { describe, expect, it } from 'vitest'
import {
  CONTACT_METHODS,
  IDENTITY_MODES,
  REPORT_AREAS,
  REPORT_TYPES,
  URGENCY_OPTIONS,
} from './report-options'

describe('report options', () => {
  it('define os quatro tipos de manifestação aprovados', () => {
    expect(REPORT_TYPES.map((item) => item.label)).toEqual([
      'Sugestão',
      'Elogio',
      'Reclamação',
      'Denúncia',
    ])
  })

  it('define todas as áreas aprovadas', () => {
    expect(REPORT_AREAS).toEqual([
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
    ])
  })

  it('define os modos de identidade, contato e urgência', () => {
    expect(IDENTITY_MODES.map((item) => item.value)).toEqual([
      'anonymous',
      'confidential',
      'identified',
    ])
    expect(CONTACT_METHODS.map((item) => item.value)).toEqual([
      'whatsapp',
      'email',
      'in_person',
    ])
    expect(URGENCY_OPTIONS.map((item) => item.value)).toEqual([
      'no',
      'yes',
      'unsure',
    ])
  })
})
