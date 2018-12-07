const cheerio = require ('cheerio');
const axios = require ('axios');
const fs = require ('fs');

let weburl = '';


const linksLimit = 200;
const visitedLinks = [];
const nodes = [];

let resultsCount = 0;

const isURLWithinDomain = (href) =>{
    return ( href != undefined && ( href.indexOf (weburl) != - 1 || href.startsWith ('/')) )
}

const writeToFile = (pageData) =>{

    fs.writeFile ('outputFile.txt', JSON.stringify (pageData, null, 4), (err) => {
        if (err) {
            console.log (err);
        }
    });
}

const getPageLinks = async (url)=>{


    if (isURLWithinDomain (url)){

        if (url.startsWith ('/')) {
            url = weburl + url
        }

        if (url != weburl) {
            visitedLinks.push[url];
        }
        let response, $;
        try {
            response = await
            axios.get (url);
        } catch (e) {
            console.log ("error", e.message);
            console.log ("url", url);
            return;
        }
        if (response) {
            $ = cheerio.load (response.data);
        }

        const links = $ ('a'); //jquery get all hyperlinks

        $ (links).each (function (i, link) {
            let count = resultsCount ++;
            let title = $ (link).text ();
            let linkurl = $ (link).attr ('href');
            let cnode = {
                parent: url,
                title: title,
                url: linkurl
            };
            nodes.push (cnode);
            if (count <= linksLimit && ! visitedLinks.includes (linkurl)) {
                getPageLinks (linkurl);
            }
        });
        writeToFile (nodes);
        return false;
    }
}


module.exports.crawl = function (url) {
    weburl = url;
    getPageLinks(url);
};


