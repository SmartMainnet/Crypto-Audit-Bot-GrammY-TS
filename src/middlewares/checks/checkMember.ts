import { NextFunction } from 'grammy'

import { ContextType } from '../../types/index.js'

const { CHANNEL } = process.env

export const checkMember = async (ctx: ContextType, next: NextFunction) => {
  try {
    const userId = ctx.update.message!.from.id

    if (CHANNEL) {
      const join = await ctx.api.getChatMember(CHANNEL, userId)
      const isJoined = join.status !== 'left'

      if (isJoined) {
        next()
      } else {
        await ctx.reply(
          ctx.t('only_members', { CHANNEL: CHANNEL.replace('@', '') }),
          {
            parse_mode: 'Markdown',
          }
        )
      }
    } else {
      next()
    }
  } catch (e) {
    console.log(e)
  }
}
