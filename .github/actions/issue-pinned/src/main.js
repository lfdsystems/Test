const CORE = require('@actions/core')
const GITHUB = require('@actions/github')

/**
 * The main function for the issue-pinned.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const token = CORE.getInput('GHTOKEN', { required: true })
    const payload = GITHUB.context.payload
    const issueId = payload.issue.node_id
    const octokit = GITHUB.getOctokit(token)
    const mutation = `
      mutation UnpinIssue($issueId: ID!) {
        unpinIssue(input: { issueId: $issueId }) {
          clientMutationId
        }
      }
    `
    const variables = { issueId }
    const result = await octokit.graphql(mutation, variables)
    console.log(result)
  } catch (error) {
    // Fail the workflow step if an error occurs
    CORE.setFailed(error.message)
  }
}

module.exports = {
  run
}
