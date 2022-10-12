#!/usr/bin/env node
import { resolve } from 'path'

function start() {
  return import('../dist/cli.js')
}

start()