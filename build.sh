#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CURRENT_DIR=`pwd`
REPO_DIR="$( dirname "${SCRIPT_DIR}" )"
CURRENT_BRANCH="$( git rev-parse --abbrev-ref HEAD )"

build_package() {
  echo
  echo "Building package $1 ...."
  cd ${SCRIPT_DIR}/packages/$1

  modifications=`git status -s | wc -l`
  if [ "$modifications" != "0" ]; then
    echo "${1} is stale"
    exit 1
  fi

  git pull
  npm run build
  echo
}

echo "Please ensure that you are logged in NPM"
echo "Go to https://www.npmjs.com/settings/~/tokens and generate a new access token with the setting bypass 2fa set to true"
echo "Then use the command: npm config set //registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE"

echo -n "Press enter when it's done"
read

# Build all packages
build_package "onekijs-framework"
build_package "onekijs"
build_package "onekijs-ui"
build_package "onekijs-theme-clarity"

# Merge to master
echo
echo "Merging from ${CURRENT_BRANCH} to master ..."
cd ${SCRIPT_DIR}
git checkout master
git merge ${CURRENT_BRANCH}
git push
echo

# Login to NPM
echo
echo "Log in NPM ..."
# npm login
echo

# Lerna Publish
echo
echo "Publishing the packages ..."
npm run lerna-publish
echo

# Push changes done by Lerna
echo
echo "Pushing the new release to GIT ..."
git push
echo

# Go back to the original branch
echo
echo "Merging to the original branch ..."
git checkout ${CURRENT_BRANCH}
git merge master
git push
echo

cd ${CURRENT_DIR}
