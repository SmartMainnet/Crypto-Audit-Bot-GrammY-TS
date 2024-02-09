import { InputFile } from 'grammy'

import { createUser } from '../../database/methods/index.js'
import { ContextType } from '../../types/index.js'

export const startCommand = async (ctx: ContextType) => {
  try {
    const user = ctx.update.message!.from

    await ctx.reply(ctx.t('start', { first_name: ctx.me.first_name }))
    await ctx.reply(ctx.t('info'), { link_preview_options: { is_disabled: true } })

    await ctx.replyWithPhoto(new InputFile('./src/images/Example.png'), {
      caption: ctx.t('help'),
      parse_mode: 'Markdown',
    })

    await createUser(user)
  } catch (e) {
    console.log(e)
  }
}
