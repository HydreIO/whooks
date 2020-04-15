import debug from 'debug'
import Koa from 'koa'
import Body from 'koa-bodyparser'
import Router from 'koa-router'

import discord_listener from './discord'
import { emitter, middleware as taiga_middleware } from './taiga'

const { PORT = 8080, WEBHOOK_PATH = '/', DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } = process.env
const log = debug('whooks')
const router = new Router()

discord_listener({ webhook_id: DISCORD_WEBHOOK_ID, webhook_token: DISCORD_WEBHOOK_TOKEN, hook: emitter })

router
  .get(WEBHOOK_PATH, context => { context.body = 'Hello there' })
  .post(WEBHOOK_PATH, taiga_middleware)

new Koa()
  .use(Body())
  .use((context, next) => {
    const [, signature] = Object.entries(context.headers).find(([k]) => k.toLowerCase() === 'x-taiga-webhook-signature') || []
    if (!signature) {
      context.body = 'Be gone thot'
      return
    }
    context.taiga_signature = signature
    next()
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(+PORT, () => log(`🚀 Now online! (0.0.0.0:${+PORT}${WEBHOOK_PATH})`))
