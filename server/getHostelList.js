var request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require("node-fetch");
const rp = require('request-promise');

getHostels()
//let result = await getLinks()
async function getHostels(){
    console.log("Fetching the list of hostels...")
    const options = {
        uri: 'https://www.relaischateaux.com/us/site-map/etablissements',
        transform: function (body) {
          return cheerio.load(body);
        }
    }
    let $ = await rp(options)
    $("#countryF").first().remove()
    var france = $("#countryF").first().html()
    var links = france.split('"').filter(word => word.includes("https://www.relaischateaux.com/us/france/"));
    var hotels = []

    var i,j,temp,chunk = 15;
    for (i=0,j=links.length; i<j; i+=chunk) {
        console.log("Fetching each hostel details : " + Math.floor(i*100*100/links.length)/100 + "%")
        temp = links.slice(i,i+chunk);
        hotels = hotels.concat(await batchRequest(temp))
    }
    console.log(hotels)
}

async function batchRequest(uris){
    let res = []
    let hotels = []
    for (let i = 0; i < uris.length; i++){
        const options = {
            uri: uris[i],
            transform: function (body) {
              return cheerio.load(body);
            }
        }
        res.push(rp(options))      
    }
    for (let i = 0; i < uris.length; i++){
        $ = await res[i]
        var name = deleteSpaces($(".mainTitle2")["0"].children[0].data.split("\n")[1])
        hotels.push({name: name, uri: uris[i]})
    }
    return hotels
}

async function getLinks(){
    request('https://www.relaischateaux.com/us/site-map/etablissements', async function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $("#countryF").first().remove()
        var france = $("#countryF").first().html()
        var links = france.split('"').filter(word => word.includes("https://www.relaischateaux.com/us/france/"));
        var hotels = []
        for (let i = 0; i < links.length; i++){
            request(links[i], function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    var name = deleteSpaces($(".mainTitle2")["0"].children[0].data.split("\n")[1])
                    hotels.push({name: name, uri: links[i]})
                    console.log(name)
                }
            });
            await sleep(50)            
        }
        console.log(hotels)
      }
    });
}

function deleteSpaces(text){
    while(text[0] == " "){
        text = text.substr(1)
    }
    return text
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}