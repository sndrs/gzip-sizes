#!/usr/bin/env node
const { existsSync } = require('fs');
const gzipSizes = require('.');

const [, , ...userFiles] = process.argv;

if (!(userFiles.length === 1 && !existsSync(userFiles[0]))) {
    gzipSizes(userFiles);
}
