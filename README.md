<h1 align=center>@hydre/whooks</h1>
<p align=center>
  <img src="https://img.shields.io/github/license/HydreIO/whooks.svg?style=for-the-badge" />
  <a href="https://hub.docker.com/r/hydre/whooks">
    <img src="https://img.shields.io/docker/cloud/build/hydre/whooks?label=build&logo=docker&style=for-the-badge" />
  </a>
  <a>
    <img src="https://img.shields.io/docker/pulls/hydre/whooks?label=pulls&logo=docker&style=for-the-badge">
  </a>
  <a href="https://discord.gg/bRSpRpD">
    <img src="https://img.shields.io/discord/398114799776694272.svg?logo=discord&style=for-the-badge" />
  </a>
</p>

<h3 align=center>A Taiga.io webhook server for Discord built on KoaJS</h3>

<img align="center" src="https://i.imgur.com/xFBPRHo.png">

## Configuration

| variable              | default  | description                |
| --------------------- | -------- | -------------------------- |
| PORT                  | `8080`   | Webhook service port       |
| WEBHOOK_PATH          | `'/'`    | Webhook service http path  |
| SECRET                | `'none'` | Webhook service secret key |
| DISCORD_WEBHOOK_ID    | ``       | Discord webhook id         |
| DISCORD_WEBHOOK_TOKEN | ``       | Discord webhook token      |

> `https://discordapp.com/api/webhooks/<DISCORD_WEBHOOK_ID/<DISCORD_WEBHOOK_TOKEN>`

## Usage with Node

```sh
npm i
DEBUG="whooks*" \
  DISCORD_WEBHOOK_ID="xxxx" \
  DISCORD_WEBHOOK_TOKEN="xxxx" \
  npm run start
```

## Usage with Docker
```sh
docker run -t -p8080:8080 \
  -e DEBUG="whooks*" \
  -e DISCORD_WEBHOOK_ID="xxxx" \
  -e DISCORD_WEBHOOK_TOKEN="xxxx" \
  hydre/whooks
```