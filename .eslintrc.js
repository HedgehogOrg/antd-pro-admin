module.exports = {
  "extends": [
    "react-app",
    "react-app/jest",
  ],
  "rules": {
    "no-console": 0,
    "semi": [2, "always"],
    "comma-dangle": [2, "always-multiline"],
    "no-trailing-spaces": "warn",
    "no-multiple-empty-lines": [1, {"max": 1}],
    "no-var": 1,
    "no-unused-vars": [2, { "ignoreRestSiblings": true }],
  },
};