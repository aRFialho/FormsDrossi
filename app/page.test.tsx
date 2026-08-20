import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  it("identifica o Forms D'Rossi como Canal de Escuta", () => {
    const html = renderToStaticMarkup(<Home />)
    const normalizedHtml = html.replace(/&#x27;|&#39;|&apos;/g, "'")

    expect(normalizedHtml).toContain("Forms D'Rossi")
    expect(normalizedHtml).toContain('Canal de Escuta')
  })
})
