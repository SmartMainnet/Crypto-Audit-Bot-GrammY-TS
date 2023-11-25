import { InputFile } from 'grammy'

import { createUser } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const startCommand = async (ctx: ContextType) => {
  try {
    const from = ctx.update.message!.from

    await ctx.reply(ctx.t('start', { first_name: ctx.me.first_name }))

    await ctx.reply(
      ctx.t('info'),
      { disable_web_page_preview: true }
    )

    await ctx.replyWithPhoto(
      new InputFile('./src/images/Example.png'),
      {
        caption: ctx.t('help'),
        parse_mode: 'Markdown'
      }
    )

    createUser(from)
  } catch (e) {
    console.log(e)
  }
}