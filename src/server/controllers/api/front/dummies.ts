import {
  ModelController,
  ModelControllerMemberActions,
  ModelControllerActions
} from '@ditojs/server'
import { Dummy } from '@/models'

export class Dummies extends ModelController<Dummy> {
  modelClass = Dummy

  member: ModelControllerMemberActions<Dummies> = {
    allow: ['find', 'hello'],
    hello: {
      action: 'get',
      parameters: [
        { member: true },
        {
          name: 'msg',
          type: 'string',
          required: true
        }
      ],
      returns: {
        name: 'greeting',
        type: 'string'
      },
      handler(ctx, dummy, msg: string) {
        return `Hello ${dummy.fullName}: ${msg}`
      }
    }
  }

  collection: ModelControllerActions<Dummies> = {
    allow: ['find', 'wait'],
    wait: {
      action: 'get',
      returns: {
        type: 'string'
      },
      async handler() {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return 'One second has passed.'
      }
    }
  }
}
