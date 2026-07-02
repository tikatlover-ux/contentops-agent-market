import { deliverService } from './service.js'

const request = process.argv.slice(2).join(' ').replace(/\^/g, '') || 'bakery selling cakes by WhatsApp'
const output = await deliverService(`contentops ${request}`)
const parsed = JSON.parse(output) as unknown

console.log(JSON.stringify(parsed, null, 2))
