import vuePluginTypescript from '@vue/cli-plugin-typescript'
import { AdminController } from '@ditojs/server'

export class ExampleAdminController extends AdminController {
  path = 'admin'
}
