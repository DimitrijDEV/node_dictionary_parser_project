const fs = require('fs');

const getDataJSON = (directory = "", filename = "") => {
    try {
        const
            fileContent = fs.readFileSync(`./json/${directory}/${filename}`),
            data = JSON.parse(fileContent);
        return data;
    } catch (err) {
        // console.error(err);
        console.log("\nThe such file doesn't exist");
        return [];
    }
}

const writeDataJSON = (data, directory = "", filename = "") => {
    let dataJSON = JSON.stringify(data);
    fs.writeFileSync(`./json/${directory}/${filename}.json`, dataJSON);
    console.log("\n-------------The data has been written-------------\n")
}


const writeWordsToJson = (wordsArr = [], filename = "") => {
    const words = getDataJSON("words", filename);

    if (words.length === 0) {
        writeDataJSON(wordsArr, "words", filename);
        return 0;
    }

    console.log(`1.) You wanna rewrite a file: ${filename}.json`);
    console.log(`2.) You wanna cancel this action`)

    const option = prompt('Type your option: ');

    switch (+option) {
        case 1:
            writeDataJSON(wordsArr, filename);
            break;
        case 2:
            return 0;
        default:
            break;
    }
}


exports.getDataJSON = getDataJSON;
exports.writeDataJSON = writeDataJSON;
exports.writeWordsToJson = writeWordsToJson;