#!/usr/bin/env node
var program = require('commander');

program
    .alias('d')
    .version('0.1.0')
    .command('remove <dependency>', 'Remove dependency for the project')
    .command('install <dependency>', 'Install dependency for the project')
    .parse(process.argv);