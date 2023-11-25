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

    ctx.config = {
      user: user,
      msgWait: msgWait,
      address: address,
      chain: chain
    }

    ctx.editMessageText(ctx.t('audit'))

    audit(ctx)
  } catch (e) {
    console.log(e)
  }
}