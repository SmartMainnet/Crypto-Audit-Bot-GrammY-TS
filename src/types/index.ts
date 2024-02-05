import { Context, Api } from 'grammy'
import { I18nFlavor } from '@grammyjs/i18n'

export interface IChain {
  id: number
  name: string
  coin: string
  scan: string
}

interface Config {
  [key: string]: any
}

export type ContextType = Context & Config & I18nFlavor

export type BotApiType = { api: Api }
