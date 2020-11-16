import {
  AuthorizationError,
  KoaContext,
  ModelControllerActions,
  ModelControllerHooks,
  ModelControllerMemberActions,
  UserController
} from '@ditojs/server'
import { User } from '@/models/user'

export class Users extends UserController<User> {
  modelClass = User

  collection: ModelControllerActions<Users> = {
    allow: ['find', 'insert', 'login', 'logout', 'session', 'self'],
    authorize: {
      find: ['superuser', 'admin', 'editor'],
      insert: 'superuser',
      delete: 'superuser'
    }
  }

  member: ModelControllerMemberActions<Users> = {
    allow: ['find', 'delete', 'patch'],
    authorize: ['$self', 'superuser']
  }

  hooks: ModelControllerHooks<Users> = {
    async 'before:member:patch'(ctx) {
      const sessionUser = await getSessionUser(ctx)
      // Notify user if they tried editing roles without having the rights
      // to do so:
      if (!sessionUser.roles.includes('superuser')) {
        const { id, roles } = ctx.request.body as User;
        const user = await User.query(ctx.transaction).findById(id)
        if (JSON.stringify(roles) !== JSON.stringify(user.roles)) {
          throw new AuthorizationError(
            'You are not authorized to edit user roles.'
          )
        }
        delete ctx.request.body.roles
      }
    },
    async 'after:collection:find'(ctx, result) {
      const user = await getSessionUser(ctx)
      if (!user.roles.includes('superuser')) {
        const results = result.results.filter(({ id }: User) => user.id === id)
        result = {
          results,
          total: results.length
        }
      }
      return result
    }
  }
}

function getSessionUser(ctx: KoaContext) {
  const [, id] = (ctx.session?.passport?.user || '').split('-')
  return User.query(ctx.transaction).findById(id)
}
