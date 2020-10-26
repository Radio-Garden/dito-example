import { TimeStampedModel } from '@ditojs/server'
import type { Dummy } from './dummy'

export class Message extends TimeStampedModel {
  declare text: string
  declare dummy: Dummy

  static properties = {
    text: {
      type: 'string',
      required: true
    }
  }

  static relations = {
    dummy: {
      relation: 'hasOne',
      from: 'Message.dummyId',
      to: 'Dummy.id'
    }
  }
}
