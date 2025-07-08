/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

module.exports = eslintConfig;