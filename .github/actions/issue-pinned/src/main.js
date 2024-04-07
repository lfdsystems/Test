const CORE = require('@actions/core')
const GITHUB = require('@actions/github')
const { GraphQLClient } = require('graphql-request')

/**
 * The main function for the issue-pinned.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    CORE.info('Starting the workflow...')
    // Code that performs certain tasks
    CORE.info('Task completed successfully.')
  } catch (error) {
    // Fail the workflow step if an error occurs
    CORE.setFailed(error.message)
  }
}

module.exports = {
  run
}
