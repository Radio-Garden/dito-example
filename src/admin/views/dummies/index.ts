import type { View } from '@ditojs/admin'
import { labelize } from '@ditojs/utils'
import type { Dummy } from '@/models/dummy'

export const dummies: View<Dummy> = {
  type: 'list',
  label: 'Dummies',
  form: import('./dummy'),
  itemLabel: 'fullName',
  resource: {
    path: 'dummies'
  },
  columns: {
    prefix: {
      sortable: true,
      render: ({ value }) => `${labelize(value)}.`
    },
    firstName: { sortable: true },
    lastName: { sortable: true },
    country: { sortable: true },
    tags: {
      render: ({ value = [] }) => value.join(', ')
    }
  },
  scopes: ['all', 'verified'],
  creatable: true,
  deletable: true,
  editable: true,
  paginate: 20
}
