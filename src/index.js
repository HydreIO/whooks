import Koa from "koa"
import debug from 'debug'
import Body from 'koa-bodyparser'
import Router from 'koa-router'
import { middleware as taiga_middleware, emitter } from './taiga'
import discord_listener from './discord'

const { PORT = 8080, WEBHOOK_PATH = '/', DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } = process.env
const log = debug('whooks')
const router = new Router()

discord_listener({ webhook_id: DISCORD_WEBHOOK_ID, webhook_token: DISCORD_WEBHOOK_TOKEN, hook: emitter })

router
  .get(WEBHOOK_PATH, ctx => { ctx.body = 'Hello there' })
  .post(WEBHOOK_PATH, taiga_middleware)

new Koa()
  .use(Body())
  .use((ctx, next) => {
    const [, signature] = Object.entries(ctx.headers).find(([k, v]) => k.toLowerCase() === 'x-taiga-webhook-signature') || []
    if (!signature) {
      ctx.body = 'Be gone thot'
      return
    }
    ctx.taiga_signature = signature
    next()
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(+PORT, () => log(`🚀 Now online! (0.0.0.0:${+PORT}${WEBHOOK_PATH})`))
