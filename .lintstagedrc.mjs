const eslintCommand = 'eslint --fix';
const prettierCommand = 'prettier --write';

/** @type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  '*.{ts,tsx}': [
    () => 'tsc --incremental false --noEmit',
    eslintCommand,
    prettierCommand,
  ],
  '*.{js,jsx}': [eslintCommand, prettierCommand],
  '*.{json,yml,md,html,css,scss}': prettierCommand,
};

export default lintStagedConfig;
