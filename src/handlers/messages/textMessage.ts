import { ContextType } from '../../types/index.js'

export const textMessage = async (ctx: ContextType) => {
  await ctx.reply(ctx.t('only_contracts'))
}
