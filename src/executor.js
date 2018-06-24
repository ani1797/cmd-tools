const exec = require('child_process').exec;

module.exports = function(command, callback){
    const execution = exec(command, {cwd: process.cwd()});
    execution.stdout.on('data', function(data) {
        console.log(data);
    });
    execution.stderr.on('data', function(data) {
        console.log(data);
    });
    return execution;
};