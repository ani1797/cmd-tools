#!/usr/bin/env node
var program = require('commander');
var inquirer = require('inquirer');
var path = require('path');
var fs = require('fs');

const del = (p) => {
    if (fs.existsSync(p)) {
        fs.readdirSync(p).forEach(function (entry) {
            var entry_path = path.join(p, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                del(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(p);
    }
};

function clean(interactive = false) {
    const pth = process.cwd();
    const folders = [...fs.readdirSync(pth)]
        .filter(value => (
            fs.statSync(path.join(pth, value)).isDirectory() &&
            fs.readdirSync(path.join(pth, value)).includes("node_modules")
        ));

    if(folders.length == 0){
        console.log('nothing to clean here');
        return;
    } else {
        if(interactive) {
            const prompt = inquirer.createPromptModule();
            prompt({
                type:'checkbox',
                name: 'filter',
                message: 'Select Folders to clean',
                choices: folders
            }).then(choices => choices.filter).then(choices => {
                console.log('Selected folders to clean: %s', choices);
                const clean_path = choices.map(v => path.join(pth, v, "node_modules"))
                    .forEach(v => del(v));
            }).catch(e => {
                console.log(e);
            });
        } else {
            const clean_path = folders.map(v => path.join(pth, v, "node_modules"))
                .forEach(v => del(v));
        }
    }
}


program
    .alias('cln')
    .version('0.1.0')
    .option('-i, --interactive', 'start cleaning in interactive mode')
    .parse(process.argv);

if(program.interactive){
    console.log('start cleaning in interactive mode.')
    clean(true);
} else {
    console.log('start cleaning in none interactive mode.')
    clean(false);
}