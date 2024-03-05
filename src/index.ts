import 'dotenv/config'
import { Bot } from 'grammy'

import { connectMongoose } from './database/connect/index.js'
import { i18nMiddleware, limitMiddleware } from './middlewares/plugins/index.js'
import { checkChains, checkMember } from './middlewares/checks/index.js'
import { helpCommand, infoCommand, startCommand } from './handlers/commands/index.js'
import { addressMessage, textMessage } from './handlers/messages/index.js'
import { selectChainCallback } from './handlers/callbacks/index.js'
import { ContextType } from './types/index.js'

await connectMongoose()

const { BOT_TOKEN } = process.env

const bot = new Bot<ContextType>(BOT_TOKEN!)

// set commands
await bot.api.setMyCommands([
  { command: 'start', description: 'Restart bot' },
  { command: 'info', description: 'Show info' },
  { command: 'help', description: 'Show help' },
])

// plugins
bot.use(i18nMiddleware)
bot.use(limitMiddleware)

// commands
bot.command('start', startCommand)
bot.command('info', infoCommand)
bot.command('help', helpCommand)

// messages
bot.hears(/^(0x)?[0-9a-f]{40}$/i, checkMember, checkChains, addressMessage)
bot.hears(/./, checkMember, textMessage)

// callbacks
bot.callbackQuery(/^[a-z]+\s(0x)?[0-9a-f]{40}$/i, selectChainCallback)

// start bot
bot.start({
  onStart(botInfo) {
    console.log('botInfo: ', botInfo)
  },
  allowed_updates: ['message', 'callback_query'],
})
