import 'dotenv/config'
import { Bot } from 'grammy'

import { connectMongoose } from './database/connect/index.js'
import { i18nMiddleware, limitMiddleware } from './middlewares/plugins/index.js'
import { checkChains, checkMember } from './middlewares/checks/index.js'
import { helpCommand, infoCommand, startCommand } from './handlers/commands/index.js'
import { addressMessage, textMessage } from './handlers/messages/index.js'
import { buttonCallback } from './handlers/callbacks/index.js'
import { ContextType } from './types/index.js'

await connectMongoose()

const { BOT_TOKEN } = process.env

const bot = new Bot<ContextType>(BOT_TOKEN!)

// plugins
bot.use(i18nMiddleware)
bot.use(limitMiddleware)

// commands
bot.command('start', startCommand)
bot.command('info', infoCommand)
bot.command('help', helpCommand)

// messages
bot.hears(/^(0x)?[0-9a-f]{40}$/i, checkMember, checkChains, addressMessage)
bot.hears(/./, textMessage)

// callbacks
bot.callbackQuery(/./, buttonCallback)

bot.start({
  onStart(botInfo) {
    console.log('botInfo: ', botInfo)
  },
})
