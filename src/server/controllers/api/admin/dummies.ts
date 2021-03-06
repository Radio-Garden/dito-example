import { ModelController, ModelControllerActions } from '@ditojs/server'
import { Dummy } from '@/models'
export class Dummies extends ModelController<Dummy> {
  modelClass = Dummy
  scope = '^admin'
  graph = true
  authorize = ['admin', 'editor', 'superuser']

  collection: ModelControllerActions<Dummies> = {
    allow: ['find', 'insert']
  }

  member = {
    allow: ['find', 'patch', 'delete']
  }
}
