import { ContextType } from '../../types/index.js'

export const infoCommand = async (ctx: ContextType) => {
  try {
    await ctx.reply(ctx.t('info'), { link_preview_options: { is_disabled: true } })
  } catch (e) {
    console.log(e)
  }
}
