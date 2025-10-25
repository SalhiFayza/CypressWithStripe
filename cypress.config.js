const { defineConfig } = require('cypress')

module.exports = defineConfig({
  pageLoadTimeout:60000,
  chromeWebSecurity:false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents (on, config) {
    }
  }
})
