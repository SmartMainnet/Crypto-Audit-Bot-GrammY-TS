import { limit } from '@grammyjs/ratelimiter'
import { RedisType } from '@grammyjs/ratelimiter/out/typesAndDefaults.js'

import { ContextType } from '../../types/index.js'

export const limitMiddleware = limit<ContextType, RedisType>({
  timeFrame: 2000,
  limit: 2,
  onLimitExceeded: (ctx: ContextType) => ctx.reply(ctx.t('limit'))
})