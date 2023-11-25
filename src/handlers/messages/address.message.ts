import { audit } from '../../utils/index.js'
import { ContextType } from '../../types/index.js'

export const addressMessage = async (ctx: ContextType) => audit(ctx)