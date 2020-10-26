import { ApplicationConfig } from "@ditojs/server"

const config : ApplicationConfig = {
  app: {
    helmet: {
      // Admin doesn't work in dev mode with the default helmet v4 CSP settings:
      contentSecurityPolicy: false
    }
  }
}

export default config
