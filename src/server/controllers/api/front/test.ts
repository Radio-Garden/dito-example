import { Controller, ControllerAction } from '@ditojs/server'

export class Test extends Controller {
  path = 'test'

  whatever: ControllerAction<Test> = {
    action: ['get', '.'],
    handler() {
      return 'hello'
    },
    returns: {
      type: 'string'
    }
  }
}
