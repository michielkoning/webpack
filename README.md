# webpack

## Starter script
npm i && npm install -g eslint-plugin-react eslint-plugin-jsx-a11y eslint eslint-config-airbnb eslint-plugin-import stylelint

## Git hook
### commit-msg

```
#!/bin/bash
jsFiles=$(git diff --cached --name-only | grep '\.jsx\?$')
cssFiles=$(git diff --cached --name-only | grep '\.scss\?$')

# Prevent ESLint help message if no jsFiles or cssFiles matched
if [[ $jsFiles = "" ]] && [[ $cssFiles = "" ]]; then
  exit 0
fi

jsFailed=0
cssFailed=0

# Loop through the js files and run the eslint
for file in ${jsFiles}; do
  git show :$file | eslint $file --fix
  if [[ $? != 0 ]] ; then
    jsFailed=1
    git reset $file
  fi
done;

# Show a message when there is an linterror
if [[ $jsFailed != 0 ]] ; then
  echo "🚫🚫🚫 ESLint failed"
fi

# Loop through the scss files and run the stylelint
for file in ${cssFiles}; do
  git show :$file | stylelint $file --fix
  if [[ $? != 0 ]] ; then
    cssFailed=1
    git reset $file
  fi
done;

# Show a message when there is an stylelinterror
if [[ $cssFailed != 0 ]] ; then
  echo "🚫🚫🚫 Stylelint failed"
fi

# Cancel the commit when there is any linterror
if [[ $jsFailed != 0 ]] || [[ $cssFailed != 0 ]]; then
	echo "git commit denied!"
	exit 1
fi
```
