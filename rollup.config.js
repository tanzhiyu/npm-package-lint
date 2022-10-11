import json from 'rollup-plugin-json';
export default {
  input: "src/cli.js",
  output: {
    file: "dist/cli.js"
  },
  plugins: [ json() ]
}