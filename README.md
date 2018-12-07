# Simple Web Crawler 

## To execute this crawler  Eg:

```
npm run crawl https://www.w3schools.com 
```

## To execute locally


Start local mock website
```
npm start
```
On another terminal

```  
npm run crawl http://localhost:8080

```

There were many options to approach implementation of web crawlers in Node world.
Couple of things which I went through are web drivers like phantom and puppeteer.
I have settled with cheerio as it make sense in a unit test scenario.