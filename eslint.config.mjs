import nextConfig from "eslint-config-next/core-web-vitals";
import tsConfig from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextConfig,
  ...tsConfig,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "off",
      "import/no-anonymous-default-export": "off"
    }
  },
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"]
  }
];

export default config;
