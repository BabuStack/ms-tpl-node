module.exports = {
  root: true,
  env : {
    "node": true
  },
  parser : '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any"               : 0,
    "key-spacing"                                      : ["error", { "align": "colon" }],
    "@typescript-eslint/no-var-requires"               : 0,
    "indent"                                           : [
      2,
      2
    ],
  }
};