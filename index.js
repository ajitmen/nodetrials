const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const weburl = 'https://example.com/';


const linksLimit = 200;
const visitedLinks = [];

let resultsCount = 0;

const getPageLinks = async (url) => {
    
    if (qualifyURLWithinDomain(url)) {
        if(url.startsWith('/')){
            url = weburl+url;           
        }
        if(url!=weburl){
            visitedLinks.push[url];
        }
        let response,$;
        try {
        response = await axios.get(url);
        } catch(e) {
        console.log(e.message)
        }        
        if(response){
            $ = cheerio.load(response.data);   
        }
             
        const links = $('a'); //jquery get all hyperlinks    
        const nodes = [];
        $(links).each(function (i, alink) {
            const count = resultsCount++;
            const title = $(alink).text();
            const linkurl = $(alink).attr('href');
            const cnode = {
                parent : url,
                title: title,
                url: linkurl
            }; 
            nodes.push(cnode);             
           
            if(count <= linksLimit && !visitedLinks.includes(linkurl)) {   
                     
                getPageLinks(linkurl);
            }
        });
        writeToFile(nodes);
        return false;
    }    
}

const qualifyURLWithinDomain = (href) => {
    return ( href!=undefined && ( href.indexOf(weburl) != -1 || href.startsWith('/')) )
}

const writeToFile = (pageData) => {
    fs.writeFile('outputFile.txt', JSON.stringify(pageData, null, 4), (err) => {
        if (err) {
            console.log(err)
        }
    })
}

getPageLinks(weburl);