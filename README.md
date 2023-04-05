# ORIGYN Canister Factory

The official client library for interacting with the Origyn `Canister Factory` canister using TypeScript or JavaScript.

## Quick Start

To get started, install the library using npm:

```
npm i @origyn/canister-factory-client
```

## Usage

### Importing the library

**_TypeScript and ES6 Modules_**

```typescript
import CanisterFactory from '@origyn/canister-factory-client';
```

**_JavaScript and CommonJS_**

```javascript
const CanisterFactory = require('@origyn/canister-factory-client');
```

# Contributors

## Building and Testing the library

```
npm ci
npm run build
npm run test
```

## GitLab and GitHub Hosting

This repository is maintained on a private `GitLab` server. When code is merged into the `develop` or `main` branch, the entire `GitLab` repository is mirrored to the `GitHub` repository, overwriting any changes since the last mirror. Therefore, all changes should be made to the `GitLab` repository.

## Branching Strategy

The branching strategy used in this repository is as follows:

- The `develop` branch is the center of all development. All feature branches are branched from, and merged back into the `develop` branch. Integration testing of multiple features is done from the `develop` branch.
- The `main` branch is the release branch. The library is published to `npm` by the `GitLab` CI/CD pipeline when the `develop` branch is merged into the `main` branch. This is the only way the `main` branch should be updated.

Both the `develop` and `main` branches are protected, so only administrators can push directly to these branches. That should only happen during the CI/CD pipeline when updating the library patch version. All other changes should **only** be made through merge requests.

## CI/CD and Versioning

The GitLab CI/CD pipeline builds, tests, and deploys this library when merging the `develop` branch into the `main` branch.

- **`build` stage:**
  - Installs dependencies with `npm ci`
  - Builds the project with `npm run build`
- **`test` stage:**
  - Runs tests with `npm test`
- **`deploy` stage:**
  - Runs only when merging from `develop` to `main`
  - Runs `git fetch` to fetch the latest changes from the remote repository
  - Gets the version number in the `package.json` file from both branches
  - Checks-out the `develop` branch
    - If the version number in `develop` matches `main`:
      - Increments the patch version number
      - Creates a new git tag
      - Pushes the updated version and the new git tag
  - Checks-out the `main` branch
    - Merges the `develop` branch into the `main` branch to bring the updated `package.json`
      - Pushes the merged changes to the remote `main` branch
    - Authenticates with npm using the `NPM_TOKEN` environment variable
      - Publishes the library to `npm` in the `@origyn` organization
    - Tags the `main` branch with the version number
      - Pushes the new tag to the `main` branch

**Manual instructions:**

1. **Remove `Merge When Pipeline Succeeds` option in GitLab for the specific merge request:**
   - When creating a merge request or updating an existing one, uncheck the `Merge When Pipeline Succeeds` option to prevent GitLab from automatically merging the changes when the pipeline succeeds.
   - If this step is skipped, the pipeline will still succeed, but there will be two merges to the `main` branch.
2. **Create and set the `NPM_TOKEN` environment variable in GitLab:**
   - Log in to your npm account and generate an access token with the necessary permissions for publishing packages.
   - In GitLab, go to your project's Settings > CI/CD > Variables.
   - Click "Add Variable" and create a new variable named `NPM_TOKEN` with the value being the access token you generated from npm.
   - Ensure that the variable is set to be protected and masked.
