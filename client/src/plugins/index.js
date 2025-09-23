/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import axios_plugin from './api'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(axios_plugin)
}
