import { describe, expect, it } from 'vitest'
import { getReportFormVisibility } from './report-form-visibility'

describe('getReportFormVisibility', () => {
  it('oculta nome e contato para anônimo sem retorno', () => {
    expect(getReportFormVisibility('anonymous', false)).toEqual({
      showName: false,
      showContact: false,
    })
  })

  it('mostra nome para identificação confidencial', () => {
    expect(getReportFormVisibility('confidential', false)).toEqual({
      showName: true,
      showContact: false,
    })
  })

  it('mostra nome e contato para identificado que deseja retorno', () => {
    expect(getReportFormVisibility('identified', true)).toEqual({
      showName: true,
      showContact: true,
    })
  })

  it('mantém nome oculto e permite contato voluntário no modo anônimo', () => {
    expect(getReportFormVisibility('anonymous', true)).toEqual({
      showName: false,
      showContact: true,
    })
  })
})
