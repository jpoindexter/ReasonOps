// eslint.config.js
import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: new URL(".", import.meta.url),
      },
      environment: {
        node: true,
        browser: true,
        es2022: true,
      },
      globals: {
        process: true,
        fetch: true,
        describe: true,
        it: true,
        expect: true,
        vi: true,
        global: true,
        URL: true,
        __dirname: true,
      },
      linterOptions: {
        ignorePatterns: [
          "node_modules/",
          "dist/",
          "build/",
          ".next/",
          ".turbo/",
        ],
      },
    },
    plugins: {
      "@typescript-eslint": plugin,
      import: importPlugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
      // TODO: Confirm plugin.configs["recommended-type-checked"] exists and is valid
      ...plugin.configs["recommended-type-checked"]?.rules,
      "@typescript-eslint/explicit-function-return-type": ["error"],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
      "import/no-duplicates": "error",
      "no-undef": "off",
    },
  },
];
