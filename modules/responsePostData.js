const prompt = require('prompt-sync')();
const { getContentHtmlPage, getWordTranslation } = require('./requestPostData');

function getHtmlPages(wordsArr = []) {
    const params = [
        { native: "english", foreign: "polish" },
        { native: "french", foreign: "polish" },
        { native: "german", foreign: "polish" },
        { native: "italian", foreign: "polish" },
        { native: "spanish", foreign: "polish" },
        { native: "portuguese", foreign: "polish" }
    ];

    params.map((val, index) => {
        console.log(`${index + 1}.) ${val.native} to ${val.foreign}`)
    })

    const
        option = prompt('Type your option: '),
        wordsCount = prompt('How much word do you want to parse: '),
        langOption = params[option - 1],
        directoryName = `${langOption.native}-${langOption.foreign}`;

    let count = 0;

    let interval = setInterval(() => {
        count++;

        if (count === +wordsCount) {
            clearInterval(interval);
        }

        getContentHtmlPage(langOption.native, langOption.foreign, directoryName, wordsArr[count]);
    }, 3000);
}

function getForeignWords(words = []) {
    return new Promise((res, rej) => {
        const params = [
            { native: "en", foreign: "de" },
            { native: "en", foreign: "fr" },
            { native: "en", foreign: "it" },
            { native: "en", foreign: "es" },
            { native: "en", foreign: "pt" }
        ];

        let newWordsArr = [];

        params.map((val, index) => {
            console.log(`${index + 1}.) ${val.native} to ${val.foreign}`)
        })

        const
            option = prompt('Type your option: '),
            wordsCount = prompt('How much word do you want to get: '),
            attrOption = params[option - 1];

        let count = 0;

        console.log(`\nTranslation from ${attrOption.native} to ${attrOption.foreign}:`);

        try {
            let interval = setInterval(async () => {
                count++;

                let word = await getWordTranslation(words[count], attrOption.native, attrOption.foreign);

                console.log(`${words[count]} -> ${word}`);

                newWordsArr.push(word);

                if (count === +wordsCount) {
                    clearInterval(interval);
                    res(newWordsArr);
                }
            }, 3000);


        } catch (error) {
            console.log("ERROR: " + error);
            rej([]);
        }
    })
}


function getWordsTranslation(words = []) {
    return new Promise((res, rej) => {
        const params = [
            { native: "en", foreign: "pl" },
            { native: "de", foreign: "pl" },
            { native: "fr", foreign: "pl" },
            { native: "it", foreign: "pl" },
            { native: "es", foreign: "pl" },
            { native: "pt", foreign: "pl" }
        ];

        let newWordsArr = [];

        params.map((val, index) => {
            console.log(`${index + 1}.) ${val.native} to ${val.foreign}`)
        })

        const
            option = prompt('Type your option: '),
            wordsCount = prompt('How much word do you want to get: '),
            attrOption = params[option - 1];

        let count = 0;

        console.log(`\nTranslation from ${attrOption.native} to ${attrOption.foreign}:`);

        try {
            let interval = setInterval(async () => {
                count++;

                let word = await getWordTranslation(words[count], attrOption.native, attrOption.foreign);
                let wordObj = {
                    word: words[count],
                    translation: word.toLowerCase()
                }

                if (words[count] !== word && wordObj.translation.includes('align') === false) {
                    console.log(`${wordObj.word} -> ${wordObj.translation}`);
                    newWordsArr.push(wordObj);
                }

                if (count === +wordsCount) {
                    clearInterval(interval);
                    res(newWordsArr);
                }
            }, 1500);


        } catch (error) {
            console.log("ERROR: " + error);
            rej([]);
        }
    })
}

exports.getForeignWords = getForeignWords;
exports.getWordsTranslation = getWordsTranslation;
exports.getHtmlPages = getHtmlPages;