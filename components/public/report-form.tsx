'use client'

import { FormEvent, useMemo, useState } from 'react'
import { getReportFormVisibility } from '@/lib/report-form-visibility'
import {
  CONTACT_METHODS,
  IDENTITY_MODES,
  REPORT_AREAS,
  REPORT_TYPES,
  URGENCY_OPTIONS,
  type IdentityMode,
} from '@/lib/report-options'

const fieldClassName =
  'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-100'

export function ReportForm() {
  const [identityMode, setIdentityMode] = useState<IdentityMode>('anonymous')
  const [wantsReturn, setWantsReturn] = useState(false)
  const [showPreviewNotice, setShowPreviewNotice] = useState(false)

  const visibility = useMemo(
    () => getReportFormVisibility(identityMode, wantsReturn),
    [identityMode, wantsReturn],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowPreviewNotice(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" aria-describedby="form-privacy-note">
      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">1. Tipo de mensagem *</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
            O que você gostaria de compartilhar?
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {REPORT_TYPES.map((item) => (
            <label
              key={item.value}
              className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm has-[:checked]:border-slate-950 has-[:checked]:ring-1 has-[:checked]:ring-slate-950"
            >
              <input
                type="radio"
                name="type"
                value={item.value}
                required
                className="sr-only"
              />
              <span className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <span>
                  <span className="block font-semibold text-slate-950">{item.label}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-500">{item.description}</span>
                </span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <label htmlFor="area" className="text-sm font-semibold text-slate-700">
          2. Sobre qual área ou assunto é sua mensagem? *
        </label>
        <select id="area" name="area" required defaultValue="" className={fieldClassName}>
          <option value="" disabled>Selecione uma área</option>
          {REPORT_AREAS.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </section>

      <section>
        <label htmlFor="message" className="text-sm font-semibold text-slate-700">
          3. Conte para nós o que aconteceu ou deixe sua sugestão/elogio: *
        </label>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Descreva a situação com suas palavras. Quanto mais claro o contexto, melhor poderemos analisar.
        </p>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className={fieldClassName}
          placeholder="Escreva aqui sua manifestação..."
        />
      </section>

      <section>
        <label htmlFor="details" className="text-sm font-semibold text-slate-700">
          4. Informações adicionais
        </label>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Se for uma reclamação ou denúncia, quando possível informe data aproximada, setor envolvido, local, recorrência, testemunhas ou outros detalhes que possam ajudar na análise.
        </p>
        <textarea
          id="details"
          name="details"
          rows={4}
          className={fieldClassName}
          placeholder="Campo opcional"
        />
      </section>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-700">
          5. Existe risco imediato à segurança ou integridade física de alguma pessoa?
        </legend>
        <div className="mt-3 grid gap-2">
          {URGENCY_OPTIONS.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 has-[:checked]:border-slate-400 has-[:checked]:bg-slate-50">
              <input type="radio" name="urgency" value={option.value} required className="h-4 w-4 accent-slate-950" />
              {option.label}
            </label>
          ))}
        </div>
        <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
          Em situações de perigo imediato, não dependa exclusivamente deste canal. Procure também os responsáveis internos ou o serviço público de emergência adequado.
        </p>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-700">
          6. Como deseja registrar sua manifestação? *
        </legend>
        <div className="mt-3 grid gap-3">
          {IDENTITY_MODES.map((mode) => (
            <label key={mode.value} className="cursor-pointer rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300 has-[:checked]:border-slate-950 has-[:checked]:ring-1 has-[:checked]:ring-slate-950">
              <span className="flex gap-3">
                <input
                  type="radio"
                  name="identityMode"
                  value={mode.value}
                  checked={identityMode === mode.value}
                  onChange={() => setIdentityMode(mode.value)}
                  className="mt-1 h-4 w-4 shrink-0 accent-slate-950"
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-950">{mode.label}</span>
                  <span className="mt-1 block text-sm leading-5 text-slate-500">{mode.description}</span>
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {identityMode === 'anonymous' && (
        <div id="form-privacy-note" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
          <strong>Sobre o anonimato:</strong> ao escolher esta opção, o formulário não solicitará seu nome. Evite incluir no texto informações que revelem sua identidade se desejar preservá-la. A etapa de persistência será construída para não gravar IP ou identificadores de dispositivo na manifestação anônima.
        </div>
      )}

      {visibility.showName && (
        <section>
          <label htmlFor="name" className="text-sm font-semibold text-slate-700">
            Nome <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={fieldClassName} placeholder="Seu nome" />
        </section>
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-slate-700">
          7. Você gostaria de receber um retorno? *
        </legend>
        <div className="mt-3 flex gap-3">
          <label className="flex min-w-28 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm has-[:checked]:border-slate-950 has-[:checked]:bg-slate-50">
            <input
              type="radio"
              name="wantsReturn"
              value="yes"
              checked={wantsReturn}
              onChange={() => setWantsReturn(true)}
              className="accent-slate-950"
            />
            Sim
          </label>
          <label className="flex min-w-28 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm has-[:checked]:border-slate-950 has-[:checked]:bg-slate-50">
            <input
              type="radio"
              name="wantsReturn"
              value="no"
              checked={!wantsReturn}
              onChange={() => setWantsReturn(false)}
              className="accent-slate-950"
            />
            Não
          </label>
        </div>
      </fieldset>

      {visibility.showContact && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <fieldset>
            <legend className="text-sm font-semibold text-slate-700">Forma de contato *</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONTACT_METHODS.map((method) => (
                <label key={method.value} className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm has-[:checked]:border-slate-950 has-[:checked]:ring-1 has-[:checked]:ring-slate-950">
                  <input type="radio" name="contactMethod" value={method.value} required className="mr-2 accent-slate-950" />
                  {method.label}
                </label>
              ))}
            </div>
          </fieldset>
          <label htmlFor="contact" className="mt-5 block text-sm font-semibold text-slate-700">
            Contato *
          </label>
          <input id="contact" name="contact" type="text" required className={fieldClassName} placeholder="Informe o e-mail, WhatsApp ou como podemos localizar você" />
          {identityMode === 'anonymous' && (
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Fornecer um contato é opcional e pode tornar você identificável. Se quiser preservar anonimato total, selecione “Não” para retorno.
            </p>
          )}
        </section>
      )}

      {showPreviewNotice && (
        <div role="status" className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
          A interface está pronta para validação. O envio seguro ao banco, protocolo e acompanhamento serão ativados nas próximas sprints. Nenhum dado deste formulário foi gravado.
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-lg text-xs leading-5 text-slate-500">
          Campos marcados com * são obrigatórios. Revise as informações antes de enviar.
        </p>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Enviar manifestação
        </button>
      </div>
    </form>
  )
}
