const semver = require("semver");
const { engines } = require("./package");
const version = engines && engines.node;
if (!semver.satisfies(process.version, version)) {
  console.error(`Required node version ${version}, but fund ${process.version}`);
  process.exit(1);
}