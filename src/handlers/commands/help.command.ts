import { InputFile } from 'grammy'

import { ContextType } from '../../types/index.js'

export const helpCommand = async (ctx: ContextType) => {
  try {
    await ctx.replyWithPhoto(
      new InputFile('./src/images/Example.png'),
      {
        caption: ctx.t('help'),
        parse_mode: 'Markdown'
      }
    )
  } catch (e) {
    console.log(e)
  }
}