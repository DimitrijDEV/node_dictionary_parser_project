const prompt = require('prompt-sync')();
const cheerio = require('cheerio');
const fs = require('fs');
const { getDirectories } = require('./dirsInfo');

function getInfo(type = "", htmlBlock = "", wordObject) {
    let getTranslation = cheerio.load(htmlBlock);
    let translationsArr = getTranslation(".translation.sortablemg .dictLink");

    translationsArr.each((i, word) => {
        wordObject[type].push(
            getTranslation(word).text()
        );
    });

    return wordObject;
}

function getTranslationWord(content, untranslatedWord) {

    let wordObject = {
        word: "",
        noun: [],
        adjective: [],
        verb: [],
        adverb: [],
        preposition: [],
        difficulty: "",
        category: "",
        learning_language: ""
    };

    const
        extract = cheerio.load(content),
        modifiers = [
            {
                code: "101",
                name: "noun"
            },
            {
                code: "102",
                name: "noun"
            },
            {
                code: "300",
                name: "adjective"
            },
            {
                code: "396",
                name: "adjective"
            },
            {
                code: "380",
                name: "adjective"
            },
            {
                code: "500",
                name: "preposition"
            },
            {
                code: "200",
                name: "verb"
            },
            {
                code: "400",
                name: "adverb"
            }
        ]

    wordObject.word = untranslatedWord;

    for (let i = 0; i < modifiers.length; i++) {
        let codeHtml = extract(`div[wt=${modifiers[i].code}]`).html()

        if (codeHtml !== null) {
          wordObject = getInfo(modifiers[i].name, codeHtml, wordObject);
        }
    }

   return wordObject
}


function parseHtmlPages() {
    const
        directories = getDirectories("pages"),
        option = prompt('Type your option: '),
        directoryName = directories[option - 1],
        files = getDirectories(`pages/${directoryName}`);

    let wordsTranslations = [];

    for (let i = 0; i < files.length; i++) {
        const content = fs.readFileSync(`./pages/${directoryName}/${files[i]}`, 'utf8');

        let word = getTranslationWord(`${content}`, files[i].replace('.html', ''));
        wordsTranslations.push(word);
    }

    return wordsTranslations;
}


exports.parseHtmlPages = parseHtmlPages;