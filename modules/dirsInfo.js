const fs = require('fs');


function getDirectories(folder = ""){
    const directories = [];

    fs.readdirSync(`./${folder}`).forEach(file => {
        directories.push(file);
    });

    console.log("\nThe list of folders:")

    directories.map((val, index) => {
        console.log(`${index + 1}.) ${val}`)
    })

    return directories;
}


exports.getDirectories = getDirectories;