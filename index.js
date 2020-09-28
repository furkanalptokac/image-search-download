const gis = require('g-i-s');
const fs = require('fs');
const fetch = require('node-fetch');

var dir = './img/'
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

var search = 'fotograf';
var filename = search.replace(/\s/g, "");

download = async (url, index) => {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(`${dir}/${filename}${index + 1}.jpg`, buffer, () => {
        console.log(`Download of the ${index}. picture has been completed.`);
    });
}

logResults = (error, results) => {
    var url;
    var item = 5; // How many picture do you want to download.
    if (error) console.log(error);
    else {
        for (let i = 0; i < item; i++) {
            url = results[i].url;
            // console.log(url);
            download(url, i);
        }
    }
}

gis(search, logResults);