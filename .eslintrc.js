module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "plugin:vue/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "semi": [2, "always"],
    "no-console": "off",
    "vue/no-v-html": "off",
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 1,
          allowFirstLine: true,
        },
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
  },
};
