import type { View } from '@ditojs/admin';
import type { User } from "@/models/user";

export const users : View<User> = {
  type: 'list',
  label: 'Users',
  form: import('./admin'),
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
  creatable: true,
  deletable: true,
  editable: true,
  paginate: 20
}
