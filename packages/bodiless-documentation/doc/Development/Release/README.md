# Releases

?> We adhere to the principles of [Semantic Versioning](https://semver.org/ ':target=_blank').

<!-- tabs:start -->

## **`1.x` Versions**

- All Bodiless packages will maintain a common version line at `1.y.z`.
- New "patch" versions (`1.y.Z`) will be published every two weeks, coinciding with our internal
  sprint cadence.
- In exceptional circumstances (critical bugfixes), we may publish a new version mid-sprint.
- New "minor" versions (`1.Y.0`) will be released periodically as we hit major milestones on our
  roadmap.

## `1.x` Release Process

At the end of the Sprint, a new `1.x` package version should be published as follows:

01. Create a fresh clone of the repository.
01. Checkout the release branch, e.g.:
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
01. Publish packages with the patch version update.
   ```shell-session
   npm run publish:patch
   ```
01. Update the dependencies in `package-lock.json` for each example site by following [these
    steps](../Release/UpdatePackages#updating-example-sites39-package-lockjson).
01. Create a PR to `main` from the release branch.
    - The PR title should emulate the following form:
      ```
      chore: Release v1.0.45
      ```
    - Commits in the PR should _not_ be squashed, since the tag is already attached to the
      appropriate commit hash.

!> **IMPORTANT:** Ensure that you **do not squash/merge the release branch**. You _must_ use the
   "fast-forward" merge strategy.

### Notes

- We use the `--conventional-commits` option to generate the changelog.
- We push the commit to a release branch, which must be merged to `main` using the standard PR
  process.

## **`0.x` Versions**

?> While we adhere to the principles of [Semantic Versioning](https://semver.org/ ':target=_blank'),
please note that `0.x` versions of BodilessJS were developed under ["Major Version
Zero"](https://semver.org/#spec-item-4 ':target=_blank') status, meaning that _stability and
backwards compatibility is not guaranteed_ for those versions.

- All Bodiless packages will maintain a common version line at `0.y.z`.
- New "patch" versions (`0.y.Z`) will be published every two weeks, coinciding with our internal
  sprint cadence.
- In exceptional circumstances (critical bugfixes), we may publish a new version mid-sprint.
- New "minor" versions (`0.Y.0`) will be released periodically as we hit major milestones on our
  roadmap.

## `0.x` Release Process

At the end of the Sprint, a new `0.x` package version should be published as follows:

01. Create a fresh clone of the repository.
01. Checkout the release branch, e.g.:
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
01. Publish packages with the patch version update.
   ```shell-session
   npm run publish:patch
   ```
01. Update the dependencies in `package-lock.json` for each example site by following [these
    steps](../Release/UpdatePackages#updating-example-sites39-package-lockjson).
01. Create a PR to `main` from the release branch.
    - The PR title should emulate the following form:
      ```
      chore: Release v0.0.45
      ```
    - Commits in the PR should _not_ be squashed, since the tag is already attached to the
      appropriate commit hash.

!> **IMPORTANT:** Ensure that you **do not squash/merge the release branch**. You _must_ use the
   "fast-forward" merge strategy.

### Notes

- We specify an explicit version number because we are in pre-`1.0`, so the normal semver bumps
  which would be created by conventional-commits are not appropriate. We use the
  `--conventional-commits` option to generate the changelog.
- We push the commit to a release branch, which must be merged to `main` using the standard PR
  process.

<!-- tabs:end -->
