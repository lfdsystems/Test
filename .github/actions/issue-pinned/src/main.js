const CORE = require('@actions/core')
const GITHUB = require('@actions/github')
const GraphQLClient = require('graphql-request')

/**
 * The main function for the issue-pinned.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const GHPAYLOAD = GITHUB.context.payload
    const ISSUENODEID = GHPAYLOAD.issue.node_id
    const issueId = ISSUENODEID
    const GHTOKEN = CORE.getInput('GHTOKEN', { required: true })
    console.log(`Token: ${GHTOKEN}`)
    const commentBody = 'This is the new comment'
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers: { Authorization: `Bearer ${GHTOKEN}` }
    })

    let mutation = `
      mutation UnpinIssue($issueId: ID!) {
        unpinIssue(input: { issueId: $issueId} ) {
          clientMutationId
        }
      }
    `
    let variables = { issueId }
    let response = await client.request(mutation, variables)
    console.log('Response:\n', response)

    mutation = `
      mutation AddCommentToIssue($issueId: ID!, $commentBody: String!){
        addComment(input: { subjectId: $issueId, body: $commentBody }) {
          commentEdge {
            node {
              id
              body
            }
          }
        }
      }
    `

    variables = { issueId, commentBody }
    response = await client.request(mutation, variables)
    console.log('Response:\n', response)
  } catch (error) {
    // Fail the workflow step if an error occurs
    CORE.setFailed(error.message)
  }
}

module.exports = {
  run
}
