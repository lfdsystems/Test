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
    const octokit = GITHUB.getOctokit(token)
    const issueNodeId = payload.issue.node_id
    const mutation = `
      mutation UnpinIssue( $issueNodeId: ID! ){
        unpinIssue( input: { issueId: $issueNodeId }){
          issue{
            title
          }
        }
      }
    `
    const variables = { issueNodeId }
    const graphql = octokit.graphql(mutation, variables)

    CORE.setOutput(JSON.stringify(graphql, null, 2))
  } catch (error) {
    // Fail the workflow step if an error occurs
    CORE.setFailed(error.message)
  }
}

module.exports = {
  run
}
