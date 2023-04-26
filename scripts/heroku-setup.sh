#!/bin/bash

# NOTE: This script is required for Heroku deployments.
#
# During the usual deploy process, Heroku will automaticaly run
# `npm install` which will result in a change to package-lock.json.
# This is problematic as it breaks the `npm run setup` command.
# To remedy the issue we checkout the file and then run `npm run setup`.

# Step 1: Check for the scripts dir to ensure run from root
if [ ! -d "scripts" ]; then
  echo "Can't find the scripts directory. Please run command from repo root."
  exit 1;
fi

# Step 2: Path to root package-lock.json
file_path="package-lock.json"

# Step 3: Check if the file has changes in the Git repository
git diff --quiet "$file_path"

# Step 4: Store the exit status of the git diff command
exit_status=$?

# Step 5: If exit status is 0, it means no changes in the file
if [ $exit_status -eq 0 ]; then
   exit 0;
fi

# Step 6: Checkout package-lock.json
echo "${file_path} has changes..."
echo "Resetting file..."
git checkout $file_path

# Step 7: Run the setup
npm run setup
