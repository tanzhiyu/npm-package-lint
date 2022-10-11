import { cac } from "cac";
import fs from 'fs';
import pkg from '../package.json'
import {generateNodeVersion} from './node/version'

const cli = cac("npm-package-lint");

cli.option("-node", "generate node.js version");

cli.command("generate [root]", "generate root project")
.option("--type <type>", "generate type")
.action(async (root, options) => {
  console.log("root", root)
  console.log("options", options)
  generateNodeVersion(root)
})

cli.help();
cli.version(pkg.version);
cli.parse();
