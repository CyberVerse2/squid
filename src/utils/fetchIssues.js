import { App } from '@octokit/app';
import { Octokit } from '@octokit/rest';
import fs from 'fs';

const YOUR_APP_ID = 123456; // Replace with your GitHub App ID
const YOUR_PRIVATE_KEY_PATH = 'src/utils/thisissquid.2024-03-07.private-key.pem'; // Replace with the path to your private key file

const app = new App({ appId: YOUR_APP_ID, privateKey: fs.readFileSync(YOUR_PRIVATE_KEY_PATH) });

const octokit = new Octokit({
  authStrategy: app.getInstallationAuthenticated(/* installationId */)
});

// Fetch all open issues assigned to the authenticated user across all repositories
export async function getAllOpenIssues() {
  octokit.issues.listForAuthenticatedUser({
  filter: 'assigned',
  state: 'open'
})
  .then(response => {
    const issues = response.data;
    // Process and display the fetched issues
    issues.forEach(issue => {
      console.log(`Title: ${issue.title}`);
      console.log(`Repository: ${issue.repository.full_name}`);
      console.log(`Description: ${issue.body}`);
      console.log(`Labels: ${issue.labels.map(label => label.name).join(', ')}`);
      console.log('---');
    });
  })
  .catch(error => {
    console.error('Error fetching issues:', error);
  });
}