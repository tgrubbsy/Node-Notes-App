const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//add, remove, read, list
//-----------------------
//Customize yargs version
yargs.version('1.1.0');

//add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
});

//remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

//list command
yargs.command({
   command: 'list',
   describe: 'Lists notes',
   handler(){
       notes.listNotes();
   } 
});

//read command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

//parse input
yargs.parse();


