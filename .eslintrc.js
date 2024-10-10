module.exports = {
  extends: [
    // other extends...
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // other rules...
    'react/prop-types': 'off',
    'react/display-name': 'off',
    // Suppress the defaultProps warning for react-beautiful-dnd
    'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: true }],
  },
  overrides: [
    {
      files: ['**/node_modules/react-beautiful-dnd/**/*.js'],
      rules: {
        'react/default-props-match-prop-types': 'off',
      },
    },
  ],
};