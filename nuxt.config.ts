export default defineNuxtConfig({
  modules: ['@vectorx/nuxt'],
  ssr: false,
  app: {
    head: {
      title: 'VectorX Node Management System with Kendo UI',
    },
  },
  devtools: {
    enabled: true,
  },
  typescript: {
    strict: false,
  },
  vx: {
    server: {
      middleware: {
        proxy: {
          proxies: {
            '/api/': { target: 'http://localhost:21002', ws: true },
          },
        },
      },
    },
    auth: {
      enabled: true,
      type: 'jwt',
      loginPath: '/',
      jwt: {
        accessTokenKey: 'mng-bo-token',
        refreshTokenKey: 'mng-bo-rtoken',
      },
      autoLogoutSeconds: 30000,
    },
    nuxt: {
      api: {
        maximumConcurrentNumber: 3,
        taskDelay: 10,
      },
      meta: {
        auth: {
          required: true,
        },
      },
      env: {
        secret: 'ywf3ho12haq8029s98yjzg171evf180o',
      },
      kendoUi: {
        enabled: true,
      },
      vuetify: {
        enabled: true,
      },
      ckeditor5: {
        enabled: true,
      },
      management: {
        enabled: true,
        ui: {
          tabMenu: {
            enabled: true,
          },
          defaultPage: {
            login: {
              path: '/',
            },
          },
        },
      },
      samples: {
        additionalMenus: [
          {
            icon: 'mdi-folder-outline',
            title: 'Project samples',
            items: [
              {
                title: 'API Exception Message',
                icon: 'mdi-message-badge-outline',
                componentPath: '~/components/samples/exception.vue',
                items: [],
              },
            ],
          },
        ],
      },
    },
  },
})
