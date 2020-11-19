import type { View } from '@ditojs/admin'
import type { User } from '@/models/user'

const isSuperuser = ({ user }: { user: User }) =>
  user.roles.includes('superuser')

export const users: View<User> = {
  type: 'list',
  label: 'Users',
  form: import('./user'),
  itemLabel: 'username',
  resource: {
    path: 'users'
  },
  columns: {
    username: { sortable: true },
    roles: {
      render: ({ value }) => value.join(', ')
    }
  },
  creatable: isSuperuser,
  deletable: isSuperuser,
  editable: true,
  paginate: 20
}
