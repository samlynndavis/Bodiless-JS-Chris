# Releases

?> We adhere to the principles of [Semantic Versioning](https://semver.org/ ':target=_blank').

- All Bodiless packages will maintain a common version line at `X.y.z`.
- New "patch" versions (`x.y.Z`) will be published every two weeks, coinciding with our internal
  sprint cadence.
- In exceptional circumstances (critical bugfixes), we may publish a new version mid-sprint.
- New "minor" versions (`x.Y.0`) will be released periodically as we hit major milestones on our
  roadmap.

<!-- tabs:start -->

## **Release Process**

## Release Process

At the end of the Sprint, a new package version should be published as follows:

01. Create a fresh clone of the repository.
01. Checkout the `release` branch, e.g.:
    ```shell-session
    git checkout -b release origin/release
    ```
01. Merge in the latest commits from `main`.
    ```shell-session
    git merge main
    ```
01. Initialize all dependencies, and build the project.
    ```shell-session
    npm run setup
    npm run build
    ```
01. Publish packages with the version update.
    ```shell-session
    npm run publish:<UPDATE_TYPE>
    ```
    - For `<UPDATE_TYPE>`, substitute the type of version update (i.e., `patch`, `minor`, or
      `major`).
01. Update the dependencies in `package-lock.json` for each example site by following [these
    steps](../Release/UpdatePackages#updating-example-sites39-package-lockjson).
01. Create a PR to `main` from the `release` branch.
    - The PR title should emulate the following form: `chore: Release v1.0.45`
    - Commits in the PR should _not_ be squashed, since the tag is already attached to the
      appropriate commit hash.

!> **IMPORTANT:** Ensure that you **do not squash/merge the release branch**. You _must_ use the
   "fast-forward" merge strategy.

### Notes

- We use the `--conventional-commits` option to generate the changelog.
- We push the commit to a `release` branch, which must be merged to `main` using the standard PR
  process.

## **Pre-Release Process**

## Pre-Release Process

If you need to create a _pre-release_ package version to precede a _major_ release, it should be
published as follows:

01. On GitHub, create a `release` branch off the `main` branch.
    - [`johnsonandjohnson/Bodiless-JS` | GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/ ':target=_blank')
01. Checkout the `release` branch in your local environment.
    ```shell-session
    git checkout -b release origin/release
    ```
01. Initialize all dependencies, and build the project.
    ```shell-session
    npm run setup && npm run build
    ```
01. Publish packages with selected version.  
    For example:
    ```shell-session
    npx lerna version 1.0.0-beta.1 --conventional-commits --force-publish
    ```
    - The release version has to be manually specified, as (currently) we have no npm script for
      publishing pre-release versions.
    - For information on these Lerna command flags, please see Lerna's documentation:
      - [`--conventional-commits`](https://github.com/lerna/lerna/blob/main/commands/version/README.md#--conventional-commits ':target=_blank')
      - [`--force-publish`](https://github.com/lerna/lerna/blob/main/commands/version/README.md#--force-publish ':target=_blank')
    - GitHub's _publish_ action will take care of the actual publishing.
01. Update the site's `package-lock.json`.
    ```shell-session
    cd sites/test-site/ && \
    rm -rf node_modules/ && \
    rm package-lock.json && \
    npm install --legacy-peer-deps
    ```
01. Update the dependencies in `package-lock.json` for each example site by following [these
    steps](../Release/UpdatePackages#updating-example-sites39-package-lockjson).
01. Create a PR to `main` from the `release` branch.
    - The PR title should emulate the following form: `chore: Release v1.0.0-beta.1`
    - Commits in the PR should _not_ be squashed, since the tag is already attached to the
      appropriate commit hash.

!> **IMPORTANT:** Ensure that you **do not squash/merge the release branch**. You _must_ use the
   "fast-forward" merge strategy.

### Notes

- We push the commit to a release branch, which must be merged to `main` using the standard PR
  process.

<!-- tabs:end -->
