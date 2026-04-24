// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import vueParser from "vue-eslint-parser";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "**/*.vue.js",
      "**/*.vue.ts",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...vue.configs["flat/recommended"],

  {
    files: ["playwright.config.*", "vite.config.*", "vitest.config.*"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2022,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-console": ["warn", { allow: ["error"] }],
      "@typescript-eslint/no-unused-vars": "error",
    },
  },

  {
    files: ["tests/**/*.{js,ts}", "**/*.test.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
  },

  prettier,
];
