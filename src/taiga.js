import crypto from 'crypto'
import debug from 'debug'
import Emitter from 'events'

const log = debug('whooks')
const { SECRET = 'none' } = process.env
const emitter = new Emitter()

const verify_signature = (data = '', signature = '') => {
  const hmac = crypto.createHmac('sha1', SECRET)
  return hmac.update(data).digest('hex') === signature
}

export const middleware = context => {
  if (!verify_signature(context.request.rawBody, context.taiga_signature)) {
    log('Bad signature, ignoring request.')
    return
  }
  const { action, type, ...payload } = context.request.body
  emitter.emit(`${type}:${action}`, payload)
  context.body = 'Bip bop'
}

export { emitter }
