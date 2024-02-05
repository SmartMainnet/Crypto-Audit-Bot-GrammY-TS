import { InputFile } from 'grammy'

import { ContextType } from '../../types/index.js'

export const helpCommand = async (ctx: ContextType) => {
  try {
    const image = new InputFile('./src/images/Example.png')

    await ctx.replyWithPhoto(image, {
      caption: ctx.t('help'),
      parse_mode: 'Markdown',
    })
  } catch (e) {
    console.log(e)
  }
}
