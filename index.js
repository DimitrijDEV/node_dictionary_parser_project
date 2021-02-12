const prompt = require('prompt-sync')();
const { getDirectories } = require('./modules/dirsInfo')
const { readWordsOfDocument, getUniqueWords } = require("./modules/parseWords");
const { getDataJSON, writeDataJSON } = require("./modules/jsonData");
const { getHtmlPages, getForeignWords } = require("./modules/responsePostData");
const { parseHtmlPages } = require("./modules/parseHtml");


const
    pathCambridgeWords = "./data/cambridge.txt",
    pathOxfordWords = "./data/oxford.txt";

let
    isRun = true,
    oxford = readWordsOfDocument(pathOxfordWords),
    cambridge = readWordsOfDocument(pathCambridgeWords);

const englishWords = getUniqueWords(cambridge, oxford);


function getInfoObj() {
    const directories = getDirectories('json/words');

    let infoObj = {
        words: [],
        filename: ""
    }

    console.log("\nMake a choice: ");
    console.log("1.) Choose a file if you want to know a count of words")
    console.log("2.) You wanna cancel this action\n")

    const option = prompt('Type your option: ');

    if (+option === 1) {
        const
            numberFile = prompt('Write a number of your file:'),
            filename = directories[numberFile - 1],
            words = getDataJSON("words", filename);

        infoObj.words = words;
        infoObj.filename = filename;

        return infoObj;
    }

    return infoObj
}

function displayFilesOfWords() {
    const infoObj = getInfoObj();

    console.log(`\nCount of words in ${infoObj.filename}: `, infoObj.words.length);
}

async function translateWords() {
    const
        infoObj = getInfoObj(),
        name = prompt('Type a filename for writting to a json this array: '),
        newWords = await getForeignWords(infoObj.words);

    console.log("\nWe have gotten  an array of foreign words: ", newWords.length, "\n");

    writeDataJSON(newWords, "words", name);
}

function getContentOfHtmlPages() {
    const infoObj = getInfoObj();

    getHtmlPages(infoObj.words);
}

function beginParseHtmlPages() {
    const translations = parseHtmlPages();

    console.log("Count translations: " + translations.length);

    const name = prompt('Type a filename for writting to a json this array: ');

    writeDataJSON(translations, "translations", name);
}



while (isRun) {
    console.log(
        "\nYou can choose the option:", '\n',
        "1) Display all words to use in parsing", '\n',
        "2) Get new foreign words and write them to json", '\n',
        "3) Get html pages of words and write them", '\n',
        "4) Parse html pages and write a json file", '\n',
        "5) Exit", '\n',
    );

    const option = prompt('Type your option: ');

    switch (+option) {
        case 1:
            displayFilesOfWords();
            break;
        case 2:
            translateWords();
            isRun = false;
            break;
        case 3:
            getContentOfHtmlPages();
            isRun = false
            break;
        case 4:
            beginParseHtmlPages();
            break;
        case 5:
            isRun = false;
            break;

        default:
            break;
    }
}