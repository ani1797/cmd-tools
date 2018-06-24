const program = require('commander');
const executor = require('../executor');

function install(dependency, { npm, devonly, notypes }) {
    const root = npm ? 'npm' : 'yarn';
    const action = npm ? 'install' : 'add';
    const dev_only = devonly === undefined ? false : devonly;
    const no_types = notypes === undefined ? false : notypes;
    const installDependency = `${root} ${dev_only ? (npm ? `${action} --save-dev` : `${action} -D`) : `${action}`} ${dependency}`;
    const installTypes = `${root} ${npm ? `${action} --save-dev` : `${action} -D`} @types/${dependency}`;
    const process = executor(`${installDependency} ${no_types ? '' : `&& ${installTypes}`}`);
    return process;
}

program
    .alias('i')
    .option('-n, --npm', 'use npm for installing')
    .option('-d, --devonly', 'add dependency as dev dependency')
    .option('-t, --notypes', 'install no types')
    .action(install)
    .parse(process.argv);

module.exports = install;