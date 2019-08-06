const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('New note added: ' + title));
        }
    else{
        console.log(chalk.bgRed('Note title already exists!'));
    }
}

const readNote = (title) => {
    
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if (foundNote){
        console.log(chalk.inverse(title) + ":");
        console.log(foundNote.body);
        }
    else{
        console.log(chalk.bgRed('Could not find note!'));
    }
}

const removeNote = (title) => {
    
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);

    if(newNotes.length === notes.length){
        console.log(chalk.bgRed('Your title did not match an existing note!'));
    }
    else{
        console.log(chalk.bgGreen('Deleting note: ' + title));
        saveNotes(newNotes);
    }
}

const listNotes = () => {

    const notes = loadNotes();
    console.log(chalk.inverse("Your notes:"));

    notes.forEach((note) => {
        console.log(note.title);
    });
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }

    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}