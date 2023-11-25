import { ContextType } from '../../types/index.js'

export const textMessage = (ctx: ContextType) => {
  ctx.reply(ctx.t('only_contracts'))
}