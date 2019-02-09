var request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('https://www.relaischateaux.com/us/site-map/etablissements', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $("#countryF").first().remove()
    var france = $("#countryF").first().html()
    var links = france.split('"').filter(word => word.includes("https://www.relaischateaux.com/us/france/"));
    var hotels = []
    for (let i = 0; i < links.length; i++){
        request(links[0], function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var name = deleteSpaces($(".mainTitle2")["0"].children[0].data.split("\n")[1])
                hotels.push({name: name, uri: links[i]})
            }
        });
        
    }
    console.log(hotels)
  }
});

function deleteSpaces(text){
    while(text[0] == " "){
        text = text.substr(1)
    }
    return text
}