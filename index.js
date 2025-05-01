const core = require('@actions/core');
const fetch = require('node-fetch');

(async () => {
  try {
    // Retrieve the OIDC token from GitHub Actions
    let idToken;
    try {
      idToken = await core.getIDToken();
    } catch (error) {
      core.setFailed(
        `Failed to retrieve OIDC token. Please ensure that your workflow job has the "id-token: write" permission enabled. Error: ${error.message}`
      );
      return;
    }

    // Get GitHub App installation token
    const response = await fetch('https://api.authz.bot/v1/services/github/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      core.setFailed(`Auth error: ${data.error || response.statusText}`);
      return;
    }

    // Configure git to use the token
    await core.exec('git', ['config', '--global', 'url."https://x-access-token:${data.token}@github.com/".insteadOf', 'https://github.com/']);

  } catch (err) {
    core.setFailed(err.message);
  }
})(); 
