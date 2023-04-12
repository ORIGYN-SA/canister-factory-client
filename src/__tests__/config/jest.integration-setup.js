const { execSync } = require('child_process');
const path = require('path');

// Global setup script
const scriptPath = path.join(__dirname, 'jest.integration-setup.sh');
execSync(scriptPath, { stdio: 'inherit' });

module.exports = async () => {
  // no setup logic
};
