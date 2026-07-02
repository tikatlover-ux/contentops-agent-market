import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deliverService } from './service.js'

describe('deliverService routing', () => {
  const realFetch = global.fetch

  beforeEach(() => {
    process.env.TXLINE_API_KEY = 'token'
    delete process.env.ANTHROPIC_API_KEY
    delete process.env.OPENAI_API_KEY
    delete process.env.VENICE_API_KEY
    delete process.env.LLM_PROVIDER
  })

  afterEach(() => {
    global.fetch = realFetch
    vi.restoreAllMocks()
  })

  it('rejects legacy generic services', async () => {
    const out = JSON.parse(await deliverService('coingecko eth'))
    expect(out).toEqual({ error: 'unsupported service', service: 'coingecko', supported: ['contentops', 'txline'] })
  })

  it('returns a bounded ContentOps kit without external calls', async () => {
    global.fetch = vi.fn(async () => { throw new Error('contentops should not fetch') }) as unknown as typeof fetch

    const out = JSON.parse(await deliverService('contentops bakery selling cakes by WhatsApp'))

    expect(out).toMatchObject({
      service: 'contentops-kit',
      buyer: 'agent or human operator who needs conversion-ready micro-content',
    })
    expect(out.product).toContain('bakery selling cakes by WhatsApp')
    expect(out.deliverable.whatsappReplies).toHaveLength(5)
    expect(out.deliverable.contentCalendar.length).toBeGreaterThanOrEqual(5)
    expect(out.deliverable.adaptationChecklist).toContain('Never promise guaranteed sales or unavailable inventory.')
    expect(out.settlementProof).toContain('Solana devnet escrow')
  })

  it('returns fixtures from TxLINE', async () => {
    global.fetch = vi.fn(async (url: string) => {
      if (url.endsWith('/auth/guest/start')) return { ok: true, json: async () => ({ token: 'jwt' }) }
      return { ok: true, json: async () => ([{ FixtureId: 1 }, { FixtureId: 2 }]) }
    }) as unknown as typeof fetch

    const out = JSON.parse(await deliverService('txline fixtures'))
    expect(out).toMatchObject({ service: 'txline-fixtures', count: 2 })
  })

  it('produces a deterministic edge when no live LLM key is configured', async () => {
    global.fetch = vi.fn(async (url: string) => {
      if (url.endsWith('/auth/guest/start')) return { ok: true, json: async () => ({ token: 'jwt' }) }
      if (url.includes('/api/odds/snapshot/123')) {
        return {
          ok: true,
          json: async () => ([{
            SuperOddsType: '1X2',
            PriceNames: ['part1', 'x', 'part2'],
            Pct: ['62', '22', '16'],
          }]),
        }
      }
      return {
        ok: true,
        json: async () => ([{
          FixtureId: 123,
          Participant1: 'A',
          Participant2: 'B',
          Competition: 'World Cup',
        }]),
      }
    }) as unknown as typeof fetch

    const out = JSON.parse(await deliverService('txline edge 123'))
    expect(out.analysis.call).toContain('A')
    expect(out.analysis.note).toContain('deterministic fallback')
  })
})
