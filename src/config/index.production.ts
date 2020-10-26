import { ApplicationConfig } from '@ditojs/server'

const config: ApplicationConfig = {
  log: {
    requests: true,
    routes: false,
    schema: false,
    relations: false,
    sql: false
  }
}

export default config
