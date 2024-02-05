import { auditInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { newCall } from '../../database/methods/index.js'
import { audit, chainList } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const buttonCallback = async (ctx: ContextType) => {
  try {
    const callback = ctx.update.callback_query!

    const data = callback.data!
    const user = callback.from!
    const msgWait = callback.message!

    const address = data.split(' ')[1]
    const chainName = data.split(' ')[0]

    const chain = chainList.filter(chain => chain.name === chainName)[0]

    await ctx.editMessageText(ctx.t('audit'))

    const auditResult = await audit(ctx, chain, address)

    await ctx.api.editMessageText(
      msgWait.chat.id,
      msgWait.message_id,
      auditResult!,
      {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        reply_markup: auditInlineKeyboard(chain, address),
      }
    )

    await newCall(user.id, address, chain)
  } catch (e) {
    console.log(e)
  }
}
