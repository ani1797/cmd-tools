const program = require('commander');
const executor = require('../executor');

function remove(dependency, {npm, withtypes}){
    const root = npm ? 'npm' : 'yarn';
    const action = npm ? 'uninstall' : 'remove';
    const with_types = withtypes === undefined ? false : withtypes;
    const remove = `${root} ${action} ${dependency} ${with_types ? `@types/${dependency}` : ''}`.trim();
    console.log(remove);
    const process = executor(remove);
    return process;
}

program
    .option('i')
    .option('-n, --npm', 'use npm for removing')
    .option('-w, --withtypes', 'remove everything with types')
    .action(remove)
    .parse(process.argv);

module.exports = remove;