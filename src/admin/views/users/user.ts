import type { Form } from "@ditojs/admin";

export const user : Form = {
  components: {
    username: {
      type: 'text',
      label: 'Username',
      width: '50%'
    },
    password: {
      type: 'password',
      label: 'Password',
      width: '50%'
    },
    roles: {
      type: 'checkboxes',
      width: 'auto',
      options: ['admin', 'editor', 'superuser'],
      layout: 'horizontal'
    }
  }
}
