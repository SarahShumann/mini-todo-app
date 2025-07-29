const { defineConfig } = require('cypress')
const codeCoverageTask = require('@cypress/code-coverage/task')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)  
      return config
    },
  },
})
