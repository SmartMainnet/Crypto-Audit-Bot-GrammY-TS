import { NextFunction } from 'grammy'

import { checkChainsInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { getChains } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const checkChains = async (ctx: ContextType, next: NextFunction) => {
  try {
    const msgWait = await ctx.reply(ctx.t('checking'))

    const user = ctx.update.message!.from
    const address = ctx.update.message!.text!.toLowerCase()

    const chains = await getChains(address)

    if (chains.length === 1) {
      ctx.config = {
        msgWait: msgWait,
        user: user,
        address: address,
        chain: chains[0],
      }

      await ctx.api.editMessageText(
        msgWait.chat.id,
        msgWait.message_id,
        ctx.t('audit')
      )

      next()
    } else if (chains.length > 1) {
      await ctx.api.editMessageText(
        msgWait.chat.id,
        msgWait.message_id,
        ctx.t('chain_selection'),
        {
          parse_mode: 'Markdown',
          link_preview_options: { is_disabled: true },
          reply_markup: checkChainsInlineKeyboard(chains, address),
        }
      )
    } else {
      await ctx.reply(ctx.t('only_contracts'))
    }
  } catch (e) {
    console.log(e)
  }
}
