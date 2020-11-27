import { merge } from '@ditojs/utils'
import type LocalConfig from './index.local'
import type ProductionConfig from './index.production'
import type DevelopmentConfig from './index.development'

const env = <'development' | 'production'>process.env.NODE_ENV || 'development'
const host = process.env.NODE_HOST || process.env.HOST || '0.0.0.0'
const port = process.env.NODE_PORT || process.env.PORT || '8080'

const config = {
  env,

  server: {
    host,
    port
  },

  log: {
    requests: false,
    routes: false,
    schema: false,
    relations: false,
    sql: false
  },

  app: {
    normalizePaths: true,
    keys: ['secret sauce'],
    proxy: true,
    session: true,
    passport: true,
    etag: true
  },

  knex: {
    normalizeDbNames: true
    // Details to be defined in `config.local.js` / `config.ENV.js`
  },

  admin: {
    // Used by AdminController
    mode: env === 'development' ? 'development' : 'production',
    plugins: [
      '@vue/cli-plugin-babel',
      {
        id: '@vue/cli-plugin-typescript',
        apply: require('@vue/cli-plugin-typescript')
      }
    ],
    build: {
      path: './src/admin',
      eslint: false
    },
    dist: {
      path: 'dist/src/admin'
    },
    api: {
      url: '/api/admin/',
      users: {
        path: 'users'
      },
      notifications: {
        // The amount of milliseconds multiplied with the amount of characters
        // displayed in the notification, plus 40 (40 + title + message):
        durationFactor: 30
      }
    },
    // Additional settings can be exposed to the browser side through the
    // `settings` object, accessible as `global.dito.settings` in the browser.
    settings: {
      env
    }
  },

  storages: {},

  services: {}
}

function loadConfig<T>(type: string): T | null {
  try {
    const config = require(`./index.${type}`)
    return (config && config.default) || config || null
  } catch (e) {
    return null
  }
}

export default merge(
  config,
  loadConfig<typeof LocalConfig>('local'),
  loadConfig<typeof ProductionConfig | typeof DevelopmentConfig>(env)
)
