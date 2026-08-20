import { ReportForm } from '@/components/public/report-form'
import { SiteHeader } from '@/components/public/site-header'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="mb-8">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Canal de Escuta
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Queremos ouvir você
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Este espaço foi criado para receber sugestões, elogios, reclamações e denúncias de forma organizada, respeitosa e segura.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <ReportForm />
        </section>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-slate-400">
          Forms D&apos;Rossi • Canal interno de manifestações
        </p>
      </main>
    </div>
  )
}
