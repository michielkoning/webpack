# webpack

## Starter script
npm i && npm install -g eslint-plugin-react eslint-plugin-jsx-a11y eslint eslint-config-airbnb eslint-plugin-import stylelint

## Git hook
### commit-msg

```
#!/bin/bash
jsFiles=$(git diff --cached --name-only | grep '\.jsx\?$')
cssFiles=$(git diff --cached --name-only | grep '\.jsx\?$')

# Prevent ESLint help message if no jsFiles matched
if [[ $jsFiles = "" ]] ; then
  exit 0
fi

# Prevent ESLint help message if no jsFiles matched
if [[ $cssFiles = "" ]] ; then
  exit 0
fi

failed=0
for file in ${jsFiles}; do
  git show :$file | eslint $file
  if [[ $? != 0 ]] ; then
    failed=1
  fi
done;

if [[ $failed != 0 ]] ; then
  echo "🚫🚫🚫 ESLint failed, git commit denied!"
  exit $failed
fi
```