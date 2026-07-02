/**
 * Seller services.
 *
 * The original CoralOS demo sells a verified TxLINE fair-line read for a fixture. This fork adds
 * `contentops`, a bounded micro-asset another agent can buy: WhatsApp replies plus a short content
 * calendar for a small business.
 */
import { complete, parseJsonReply } from '@pay/agent-runtime'

const TXLINE_BASE = process.env.TXLINE_BASE_URL || 'https://txline-dev.txodds.com'

export async function deliverService(request: string): Promise<string> {
  const [first, ...rest] = request.trim().split(/\s+/).filter(Boolean)
  const service = (first ?? 'txline').toLowerCase()
  if (service === 'contentops') {
    return contentOpsService(rest.join(' '))
  }
  if (service === 'txline') {
    return txlineService(rest.join(' '))
  }
  return JSON.stringify({ error: 'unsupported service', service, supported: ['contentops', 'txline'] })
}

function contentOpsService(request: string): string {
  const business = request.trim() || 'small service business'
  return JSON.stringify({
    service: 'contentops-kit',
    buyer: 'agent or human operator who needs conversion-ready micro-content',
    product: `WhatsApp sales replies and a 14-day content calendar for ${business}`,
    priceLogic: 'Seller agents bid on turnaround, specificity, and price; buyer awards best value inside budget.',
    deliverable: {
      whatsappReplies: [
        'Hola, gracias por escribirnos. Cuentanos que producto o servicio te interesa y con gusto te ayudamos.',
        'Claro. Para darte precio exacto necesito cantidad, fecha y cualquier detalle especial que quieras incluir.',
        'Hola, paso a saber si pudiste revisar la informacion. Si tienes dudas, te ayudo.',
        'Perfecto. Para confirmar tu pedido, estos son los datos: [resumen]. Si todo esta bien, avanzamos.',
        'Gracias por tu compra. Esperamos que todo haya salido muy bien.',
      ],
      contentCalendar: [
        { day: 1, goal: 'Explain what the business sells', copy: `Somos ${business}. Ayudamos a clientes con una solucion clara y facil de pedir.` },
        { day: 2, goal: 'Feature the main offer', copy: 'Nuestro producto/servicio mas pedido es ideal para quienes buscan [beneficio].' },
        { day: 3, goal: 'Answer a frequent objection', copy: 'Si estas comparando opciones, podemos mostrarte una alternativa economica y una mas completa.' },
        { day: 4, goal: 'Invite a direct message', copy: 'Escribenos con fecha, cantidad y detalle. Te respondemos con una cotizacion clara.' },
        { day: 5, goal: 'Close softly', copy: 'Tenemos disponibilidad esta semana. Si quieres reservar, escribenos con tiempo.' },
      ],
      adaptationChecklist: [
        'Replace bracketed placeholders with the buyer business data.',
        'Use real product photos where possible.',
        'Never promise guaranteed sales or unavailable inventory.',
        'Confirm payment network before accepting crypto.',
      ],
    },
    settlementProof: 'The buyer pays the winning seller through Solana devnet escrow after delivery is accepted.',
    timestamp: new Date().toISOString(),
  })
}

async function txlineGet(path: string): Promise<unknown> {
  const apiToken = process.env.TXLINE_API_KEY
  if (!apiToken) return { error: 'TXLINE_API_KEY not set - run the one-time subscribe (see examples/txodds)' }
  const auth = await fetch(`${TXLINE_BASE}/auth/guest/start`, { method: 'POST' })
  if (!auth.ok) return { error: `txline auth ${auth.status}` }
  const jwt = ((await auth.json()) as { token: string }).token
  const res = await fetch(`${TXLINE_BASE}${path}`, {
    headers: { Authorization: `Bearer ${jwt}`, 'X-Api-Token': apiToken },
  })
  if (!res.ok) return { error: `txline ${path} ${res.status}` }
  return res.json()
}

async function txlineService(request: string): Promise<string> {
  const tokens = request.trim().split(/\s+/).filter(Boolean)
  let action = (tokens[0] ?? 'fixtures').toLowerCase()
  let fixtureId = tokens[1]
  if (/^\d+$/.test(action)) {
    fixtureId = action
    action = 'edge'
  }

  switch (action) {
    case 'odds':
      return JSON.stringify({ service: 'txline-odds', fixtureId, odds: await txlineGet(`/api/odds/snapshot/${fixtureId}`) })
    case 'edge':
      return txlineEdge(fixtureId)
    case 'fixtures':
    default: {
      const fixtures = await txlineGet('/api/fixtures/snapshot')
      const list = Array.isArray(fixtures) ? fixtures : []
      return JSON.stringify({ service: 'txline-fixtures', count: list.length, fixtures: list.slice(0, 10) })
    }
  }
}

async function txlineEdge(fixtureId: string | undefined): Promise<string> {
  const [odds, fixtures] = await Promise.all([
    txlineGet(`/api/odds/snapshot/${fixtureId}`),
    txlineGet('/api/fixtures/snapshot'),
  ])
  const market = Array.isArray(odds)
    ? (odds as Array<Record<string, unknown>>).find((x) => String(x.SuperOddsType ?? '').includes('1X2'))
    : undefined
  const fx = Array.isArray(fixtures)
    ? (fixtures as Array<Record<string, unknown>>).find((f) => String(f.FixtureId) === String(fixtureId))
    : undefined
  const teams = fx ? { home: fx.Participant1, away: fx.Participant2, competition: fx.Competition } : undefined
  const matchup = teams ? `${teams.home} v ${teams.away}` : `fixture ${fixtureId}`

  const analysis = await liveReadOrFallback(matchup, odds, market, teams)
  return JSON.stringify({ service: 'txline-edge', fixtureId, teams, market, analysis })
}

async function liveReadOrFallback(
  matchup: string,
  odds: unknown,
  market: Record<string, unknown> | undefined,
  teams: Record<string, unknown> | undefined,
): Promise<unknown> {
  try {
    const text = await complete({
      system: 'You are a football trading analyst. Reply only as JSON {"call": string, "confidence": number}.',
      user:
        `For ${matchup}, make a one-line value read from these de-margined World Cup odds. ` +
        `Odds: ${JSON.stringify(odds).slice(0, 1500)}`,
      maxTokens: 180,
    })
    return parseJsonReply(text) ?? { call: text }
  } catch (e) {
    return deterministicRead(market, teams, (e as Error).message)
  }
}

function deterministicRead(
  market: Record<string, unknown> | undefined,
  teams: Record<string, unknown> | undefined,
  reason: string,
): unknown {
  const names = (market?.PriceNames ?? []) as string[]
  const pcts = (market?.Pct ?? []) as string[]
  let bestIndex = -1
  let bestPct = -1
  names.forEach((_, i) => {
    const pct = Number(pcts[i])
    if (Number.isFinite(pct) && pct > bestPct) {
      bestPct = pct
      bestIndex = i
    }
  })
  if (bestIndex < 0) return { call: 'odds unavailable', note: `deterministic fallback: ${reason}` }
  const raw = names[bestIndex]
  const label = raw === 'part1'
    ? (teams?.home ?? 'Home')
    : raw === 'part2'
      ? (teams?.away ?? 'Away')
      : 'Draw'
  return {
    call: `Odds favour ${label} (${bestPct.toFixed(0)}%)`,
    confidence: Number((bestPct / 100).toFixed(2)),
    note: `deterministic fallback: ${reason}`,
  }
}
