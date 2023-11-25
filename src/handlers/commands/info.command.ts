import { ContextType } from '../../types/index.js'

export const infoCommand = async (ctx: ContextType) => {
  try {
    await ctx.reply(
      ctx.t('info'),
      { disable_web_page_preview: true }
    )
  } catch (e) {
    console.log(e)
  }
}