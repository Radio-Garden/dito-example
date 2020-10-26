import {
  ModelFilters,
  ModelProperties,
  ModelRelations,
  ModelScopes,
  TimeStampedModel
} from '@ditojs/server'
import { Message } from './message'

export class Dummy extends TimeStampedModel {
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  // properties
  declare firstName: string
  declare lastName: string
  declare prefix?: string
  declare country: string
  declare dateOfBirth?: Date
  declare email?: string
  declare age?: number
  declare factor: number
  declare tags: string[]
  declare colors: string[]
  declare verified?: boolean
  declare comments?: string

  // relations
  declare messages?: Message[]

  static scopes: ModelScopes<Dummy> = {
    verified: (query) => query.where('verified', true),

    unverified: (query) => query.where('verified', false),

    all: (query) => query,

    admin: (query) => query.withGraph('messages')
  }

  static filters: ModelFilters<Dummy> = {
    lastName: {
      filter: 'text'
    },
    name: {
      parameters: [
        {
          name: 'name',
          type: 'text'
        }
      ],
      filter: (builder, name: string) => {
        builder.where('firstName', name)
      }
    }
  }

  static properties: ModelProperties = {
    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    fullName: {
      type: 'string',
      computed: true
    },

    prefix: 'string',

    country: {
      type: 'string',
      required: true
    },

    dateOfBirth: {
      type: 'date',
      nullable: true
    },

    email: {
      type: 'string',
      format: 'email',
      nullable: true
    },

    age: 'integer',

    factor: {
      type: 'number',
      range: [0, 50],
      required: true
    },

    tags: {
      type: 'array',
      items: {
        type: 'string'
      },
      default: []
    },

    colors: {
      type: 'array',
      items: {
        type: 'string'
      },
      default: []
    },

    // short-hands to `{ type: * }` are possible also:
    verified: 'boolean',
    comments: 'string'
  }

  static relations: ModelRelations = {
    messages: {
      relation: 'hasMany',
      from: 'Dummy.id',
      to: 'Message.dummyId',
      // This is required so that nested content can be altered in the graph.
      // Without it, only relates are allowed:
      owner: true
    }
  }
}
