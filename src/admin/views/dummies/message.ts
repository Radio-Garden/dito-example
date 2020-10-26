import type { Message } from '@/models/message'
import type { Form } from '@ditojs/admin'

export const message: Form<Message> = {
  compact: true,
  components: {
    text: {
      type: 'markup',
      label: false,
      width: '100%',
      lines: 4,
      required: true,
      resizable: true,
      marks: {
        bold: true,
        italic: true,
        strike: true,
        underline: true,
        link: true
      },
      // Replace non-breaking space with __ for better visibility while editing
      format: ({ value }) => value?.replace(/(\xa0|&nbsp;)/g, '__') ?? value,
      // ...and then back to a non-breaking space for storage:
      parse: ({ value }) => value?.replace(/__/g, '\xa0') ?? value
    }
  }
}
