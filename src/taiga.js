import crypto from 'crypto'
import debug from 'debug'
import Emitter from 'events'

const log = debug('whooks')
const { SECRET = 'none' } = process.env
const emitter = new Emitter()

const verify_signature = (data, signature) => {
  const hmac = crypto.createHmac('sha1', SECRET)
  return hmac.update(data).digest('hex') === signature
}

export const middleware = (ctx, next) => {
  if (!verify_signature(ctx.request.rawBody, ctx.taiga_signature)) {
    log('Bad signature, ignoring request.')
    return
  }
  const { action, type, ...payload } = ctx.request.body
  emitter.emit(`${type}:${action}`, payload)
  ctx.body = 'Bip bop'
}

export { emitter }