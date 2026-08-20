import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import Home from './page'

describe('Home', () => {
  it("identifica o Forms D'Rossi como Canal de Escuta", () => {
    const html = renderToStaticMarkup(<Home />)

    expect(html).toContain("Forms D'Rossi")
    expect(html).toContain('Canal de Escuta')
  })
})
