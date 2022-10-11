#!/usr/bin/env node
import { resolve } from 'path'

const args = process.argv.slice(0)
console.log(process.cwd())
function start() {
  return import('../dist/cli.js')
}

start()