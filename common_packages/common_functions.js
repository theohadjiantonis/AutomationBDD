const fs = require('fs');

//create Directory for test results
const createDirectory = async (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

//get output Directoty path for mochawesome reports
const getDir = () => {
    const date = new Date();

    return `./output/${date.toISOString().split("T")[0]}/${Math.round(date.getTime() / 1000)}`;
};

const addBrowserLogs = (path, fileName, data) => {
    try {
        createDirectory(path);
        fs.writeFile(`${path}/${fileName}`, data.toString(), function (err) {
            if (err) {
                throw err;
            }
        });
    } catch (err) {
        console.log(err);
    }
};

//clear string from special characters
const removeSpecials = (str) => {
    if (!str) return '';
    // Replace forbidden symbols in string

    return str
        .replace(/ /g, '_')
        .replace(/"/g, "'")
        .replace(/\//g, '_')
        .replace(/</g, '(')
        .replace(/>/g, ')')
        .replace(/:/g, '_')
        .replace(/\\/g, '_')
        .replace(/\|/g, '_')
        .replace(/\?/g, '.')
        .replace(/\*/g, '^')
        .replace(/'/g, '');
};

const splitString = (str, split, splitPart) =>{
    if (!str) return '';

    if(splitPart){
        return str.split(split)[splitPart];
    } else{
        return str.split(split)[0];
    }
}

module.exports = {
    createDirectory,
    getDir,
    removeSpecials,
    splitString,
    addBrowserLogs
}