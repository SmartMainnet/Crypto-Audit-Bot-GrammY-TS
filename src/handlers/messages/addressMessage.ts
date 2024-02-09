import { auditInlineKeyboard } from '../../keyboards/inline_keyboard/index.js'
import { newCall } from '../../database/methods/index.js'
import { audit } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const addressMessage = async (ctx: ContextType) => {
  const msgWait = ctx.config.msgWait
  const address = ctx.config.address
  const chain = ctx.config.chain
  const user = ctx.config.user

  const auditResult = await audit(ctx, chain, address)

  await ctx.api.editMessageText(msgWait.chat.id, msgWait.message_id, auditResult!, {
    parse_mode: 'Markdown',
    link_preview_options: { is_disabled: true },
    reply_markup: auditInlineKeyboard(chain, address),
  })

  await newCall(user.id, address, chain)
}
