const fs = require('fs');

function readWordsOfDocument(path = "") {
    let words = []

    try {
        const data = fs.readFileSync(`${path}`, 'utf8');
        words = data.split("\r\n");
    } catch (err) {
        console.error(err)
    }

    return words;
}


function allWordsToLowerCase(words = []){
    let newArr = [];

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            words[i] = words[i].toLowerCase();
            newArr.push(words[i]);
        }
    }

    return newArr.sort();
}


function getUniqueWords(firstArr = [], secondArr = []) {

    if (firstArr.length > secondArr.length) {
        for (let i = 0; i < firstArr.length; i++) {
            secondArr = secondArr.filter(word =>  word !== firstArr[i]);
        }
 
        return allWordsToLowerCase(firstArr.concat(secondArr));
    } else {
        for (let i = 0; i < secondArr.length; i++) {
            firstArr = firstArr.filter(word =>  word !== secondArr[i]);
        }

        return allWordsToLowerCase(secondArr.concat(firstArr))
    }
}

exports.readWordsOfDocument = readWordsOfDocument;
exports.getUniqueWords = getUniqueWords;
exports.allWordsToLowerCase = allWordsToLowerCase;