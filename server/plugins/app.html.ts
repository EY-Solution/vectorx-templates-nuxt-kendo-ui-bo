import { defineNitroPlugin } from 'nitropack/runtime/plugin'

export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    html.bodyAppend.push('<div style="display: none" th:text="${spaData}" id="__spa">{{ SERVER_DATA }}</div>')
  })
})
