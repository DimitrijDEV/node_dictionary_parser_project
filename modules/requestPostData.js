const axios = require('axios')
const { writeHtmlPage } = require("./htmlData");


function getContentHtmlPage(native = "", lang = "", directory = "", word = "") {
    const params = new URLSearchParams()

    params.append('query', word)

    const url =
        `https://dict.deepl.com/${native}-${lang}/search?ajax=1&source=${native}&onlyDictEntries=1&translator=dnsof7h3k2lgh3gda&delay=300&jsStatus=0&kind=full&eventkind=change&forleftside=true`;


    const config = {
        headers: {
            'Host': 'dict.deepl.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://www.deepl.com',
            'Connection': 'keep-alive',
            'Referer': 'https://www.deepl.com/translator',
            'TE': 'Trailers'
        }
    }

    axios.post(url, params, config)
        .then((result) => {
            writeHtmlPage(result.data, directory, word);
        })
        .catch((err) => {
            console.log("ERROR: " + err);
        })
}


function getWordTranslation(word = "", langNative = "", langForeign = "") {
    return new Promise((res, rej) => {
        const params = new URLSearchParams();

        params.append('text', word)
        params.append('options', 4)

        const url = `https://translate.yandex.net/api/v1/tr.json/translate?id=84c13e0a.602285e5.256c9a47.74722d74657874-0-0&srv=tr-text&lang=${langNative}-${langForeign}&reason=paste&format=text`;


        const config = {
            headers: {
                'Host': 'translate.yandex.net',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
                'Accept': '*/*',
                'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://translate.yandex.ru',
                'Connection': 'keep-alive',
                'Referer': 'https://translate.yandex.ru/?lang=en-pl&text=sea',
                'TE': 'Trailers'
            }
        }

        axios.post(url, params, config)
            .then((result) => {
                res(result.data.text[0])
            })
            .catch((err) => {
                console.log("ERROR: " + err);
                rej("")
            })
    })
}


exports.getWordTranslation = getWordTranslation;
exports.getContentHtmlPage = getContentHtmlPage;