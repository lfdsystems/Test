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
    const data = await octokit.rest.issues.get({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number
    })

    console.log(data)
  } catch (error) {
    // Fail the workflow step if an error occurs
    CORE.setFailed(error.message)
  }
}

module.exports = {
  run
}
