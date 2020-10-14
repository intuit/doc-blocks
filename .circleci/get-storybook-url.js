const { execSync } = require('child_process');

const user =
  process.env.CIRCLE_PR_USERNAME || process.env.CIRCLE_PROJECT_USERNAME;
const repo =
  process.env.CIRCLE_PR_REPONAME || process.env.CIRCLE_PROJECT_REPONAME;

module.exports = function() {
  const artifacts = JSON.parse(
    execSync(
      `curl https://circleci.com/api/v1.1/project/github/${user}/${repo}/latest/artifacts?circle-token=$CIRCLE_TOKEN&branch=$CIRCLE_BRANCH`,
      { encoding: 'utf8' }
    )
  );

  const artifact = artifacts.find(artifact =>
    artifact.url.includes('index.html')
  );

  if (artifact) {
    return artifact.url;
  }
};
