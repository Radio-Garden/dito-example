import { UserModel } from '@ditojs/server'

export class User extends UserModel {
  declare roles: ('admin' | 'editor' | 'superuser')[]
  static properties = {
    roles: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['admin', 'editor', 'superuser']
      },
      uniqueItems: true,
      default: []
    }
  }
}
