const rp = require('request-promise');
const cheerio = require('cheerio');
var hostelFectching = require("./getHostelList")
var { loadHostels, updateHostels, onlyMichelin } = hostelFectching

async function startup(){
    hostels = await updateHostels()
    //onlyMichelin(hostels)
    //onlyMichelin([{name: "hello world"}, {name: "le relais"}])
}

async function test(){
    var uri = "https://www.relaischateaux.com/us/france/albert-haute-savoie-chamonix-mont-blanc"
    const options = {
        uri: uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    var $ = await rp(options)
    console.log($(".hotelHeader-img").attr('data-src'))
}

startup()
//test()