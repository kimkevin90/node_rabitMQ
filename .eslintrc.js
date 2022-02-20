const path = require('path');

module.exports = {
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ['#', path.join(__dirname, './')],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  },
  "extends": [
    "eslint:recommended",
    "airbnb"
  ],
  "env": {
    "node": true,
    "jest/globals": true,
    "mocha": true
  },
  "plugins": [
    "jest"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/__tests__/**",
          "**/__test__/**"
        ]
      }
    ],
    "semi-spacing": "error",
    "no-unused-vars": ["error", { "argsIgnorePattern": "res|next|err" }],
    "max-len": ["error", { "code": 160 }],
    "no-empty": "off",
    "linebreak-style": 0,
    "no-useless-constructor": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "class-methods-use-this": "off",
    "function-paren-newline": ["error", "consistent"],
    "no-unused-expressions": "off",
    "no-console": ["warn", { "allow": ["info", "error", "warn"] }]
  }
}
