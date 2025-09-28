/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import axios_plugin from './api'
import websocket from './websocket'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(axios_plugin)
    .use(websocket, {
      url: 'ws://localhost:8080',
      autoConnect: true
    })
}
