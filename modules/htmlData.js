const fs = require('fs');

const getHtmlPage = (directory, filename) => {
    try {
        const fileContent = fs.readFileSync(`./pages/${directory}/${filename}.html`);
        return `${fileContent}`;
    } catch (err) {
        console.log("\nThe such file doesn't exist");
        return "";
    }
}

const writeHtmlPage = (data, directory, filename) => {
    let isHtmlPage = false;

    fs.readdirSync(`./pages/${directory}`).forEach(name => {
        if(name === `${filename}.html`){
            isHtmlPage = true;
        }
    });

    if(!isHtmlPage){
        fs.writeFileSync(`./pages/${directory}/${filename}.html`, data);
        console.log(`\n-------------The ${filename}.html  has been written-------------\n`)
    }else{
        console.log(`\n-------------The ${filename}.html file exist!-------------\n`)
    }
}

exports.getHtmlPage = getHtmlPage;
exports.writeHtmlPage = writeHtmlPage;