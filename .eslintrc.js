// .eslintrc.js

module.exports = {
  extends: [
    '@akijoey',
    'standard-with-typescript',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  parserOptions: {
    project: 'tsconfig.json'
  },
  plugins: ['react']
}
