import Discord from 'discord.js'
import debug from 'debug'

const log = debug('whooks')

export default ({ webhook_id, webhook_token, hook }) => {
  if (!webhook_id) throw new Error('Missing webhook id')
  if (!webhook_token) throw new Error('Missing webhook token')
  const client = new Discord.WebhookClient(webhook_id, webhook_token)

  hook.on('test:test', async payload => {
    await client.send({
      username: 'Taiga',
      avatarURL: 'https://cdn.discordapp.com/attachments/596130529129005056/596406037859401738/favicon.png',
      embeds: [{
        "title": "Test",
        "description": "Testing discord hook",
        "color": 7948483,
        "author": {
          "name": payload?.by?.full_name,
          "url": payload?.by?.permalink,
          "icon_url": payload?.by?.photo
        }
      }]
    })
  })
}
