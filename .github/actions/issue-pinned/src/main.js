const CORE = require('@actions/core')
const GITHUB = require('@actions/github')
const { GraphQLClient } = require('graphql-request')

/**
 * The main function for the issue-pinned.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    throw new Error('Something went wrong')
  } catch (error) {
    // Fail the workflow step if an error occurs
    CORE.error(error.message)
  }
}

module.exports = {
  run
}
