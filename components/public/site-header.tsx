import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Forms D'Rossi - início">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-sm font-bold tracking-tight text-white">
            DR
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight text-slate-950">D&apos;Rossi</span>
            <span className="block text-xs text-slate-500">Canal de Escuta</span>
          </span>
        </Link>

        <Link
          href="/admin"
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">🔒</span>
          Área restrita
        </Link>
      </div>
    </header>
  )
}
