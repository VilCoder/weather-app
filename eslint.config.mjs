import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  {
    rules: {
      // Prohibit unused variables
      "no-unused-vars": "error",

      // Prohibits the use of undefined variables
      "no-undef": "error",

      // Forces the use of === and !== instead of == and !=
      "eqeqeq": ["error", "always"],

      // Requires the use of braces in all control structures
      "curly": ["error", "all"],

      // Requires a semicolon at the end of each line
      "semi": ["error", "always"],

      // Forces the use of double quotes
      "quotes": ["error", "double"],

      // Forces indentation of 2 spaces
      "indent": ["error", 2],

      // Allows a trailing comma only in multiline objects/arrays
      "comma-dangle": ["error", "only-multiline"],

      // Displays a warning if console.log is used
      "no-console": "warn",

      // Prohibits the use of debugger
      "no-debugger": "error",

      // Avoid unnecessary spaces at the end of lines
      "no-trailing-spaces": "error",

      // Requires a space before braces in code blocks
      "space-before-blocks": "error",

      // Spaces before and after keywords
      "keyword-spacing": ["error", { "before": true, "after": true }],

      // Force spaces inside braces { a: 1 }
      "object-curly-spacing": ["error", "always"],

      // Prohibits spaces inside brackets [1,2,3]
      "array-bracket-spacing": ["error", "never"],

      // Spaces before and after =>
      "arrow-spacing": ["error", { "before": true, "after": true }],

      // Suggests using const instead of let if the variable does not change
      "prefer-const": "error",

      // Prohibits the use of var, recommends let or const
      "no-var": "error",

      // Forces the use of camelCase in variable and property names
      "camelcase": ["error", { "properties": "always" }],

      // Limit consecutive line breaks
      "no-multiple-empty-lines": ["error", { "max": 3, "maxEOF": 3 }],

      // Requires a blank line at the end of the file
      "eol-last": ["error", "always"],

      // Requires a space after comments
      "spaced-comment": ["error", "always"],

      // Forces functions to always return a consistent value
      "consistent-return": "error",

      // Prohibits using variables before declaring them (except functions)
      "no-use-before-define": ["error", { "functions": false, "classes": true }],

      // Maximum 100 characters per line
      "max-len": ["error", { "code": 100 }],

      // Prohibits variables with the same name as variables of a higher scope
      "no-shadow": "error",

      // Prefers to access properties with the dot notation instead of brackets
      "dot-notation": "error",

      // Avoid variable names with underscores (_) except in `this._prop`
      "no-underscore-dangle": ["error", { "allowAfterThis": false }],

      // Prohibits ++ and -- except in loops
      "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],

      // Forces the base to be specified in parseInt()
      "radix": ["error", "always"],

      // Prohibits importing the same module twice
      "no-duplicate-imports": "error",

      // Forces the use of template literals instead of concatenation with +
      "prefer-template": "error",

      // Requires parentheses in arrow functions
      "arrow-parens": ["error", "always"],

      // Forces shorthand on objects { foo: foo } → { foo }
      "object-shorthand": ["error", "always"],

      // It does not allow declaring multiple variables on a single line
      "one-var": ["error", "never"],

      // Prefers to use destructuring arrays and objects
      "prefer-destructuring": ["error", { "object": true, "array": true }],

      // Requires new line on long chained calls
      "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],

      // Prohibits the use of new Object()
      "no-new-object": "error",

      // Prefers the use of object spread instead of Object.assign()
      "prefer-object-spread": "error",

      // Prohibits the use of the Array constructor
      "no-array-constructor": "error",

      // Disallows function declarations inside loops
      "no-loop-func": "error",

      // Prohibits the use of the Function constructor
      "no-new-func": "error",

      // Enforces consistent line breaks inside function parentheses
      "function-paren-newline": ["error", "multiline"],

      // Requires spaces around operators a + b
      "space-infix-ops": ["error", { "int32Hint": false }],

      // Disallows spaces inside parentheses ( a + b )
      "space-in-parens": ["error", "never"],

      // Enforces consistent spacing before and after commas
      "comma-spacing": ["error", { "before": false, "after": true }],
    }
  },
  eslintConfigPrettier,
]);
