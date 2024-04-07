const CORE = require('@actions/core')
const GITHUB = require('@actions/github')
const { GraphQLClient } = require('graphql-request')

/**
 * The main function for the issue-pinned.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    CORE.info('\u001b[35mStarting the workflow...')
    CORE.info('\u001b[38;5;6mTask completed successfully.')
    CORE.info('\u001b[38;2;255;0;0mThis foreground will be bright red')
    CORE.info('\u001b[43mThis background will be yellow')
    CORE.info('\u001b[48;5;6mThis background will be cyan')
    CORE.info('\u001b[48;2;255;0;0mThis background will be bright red')
    CORE.info('\u001b[1mBold text')
    CORE.info('\u001b[3mItalic text')
    CORE.info('\u001b[4mUnderlined text')
    CORE.info(
      '\u001b[31;46mRed foreground with a cyan background and \u001b[1mbold text at the end'
    )
    CORE.info('\u001b[35mThis foreground will be magenta')
    CORE.info('This foreground will reset to the default')
    throw new Error('Error')
  } catch (error) {
    // Fail the workflow step if an error occurs
    CORE.setFailed()
  }
}

module.exports = {
  run
}
