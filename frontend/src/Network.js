
export default {
    fetchPrice: async (date, entityId) => {
        // let response = await new Promise(resolve => {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open("POST", "https://www.relaischateaux.com/us/search/availability/check?month="+date.getMonth+"-"+date.getYear()+"&idEntity="+entityId+"&pax=2&room=1", true);
        //     xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
        //     xhr.onload = function(e) {
        //       resolve(xhr.response);
        //     };
        //     xhr.onerror = function () {
        //       resolve(undefined);
        //       console.error("** An error occurred during the XMLHttpRequest");
        //     };
        //     xhr.send();
        //  }) 
        //  console.log(await response)
        return getRandomInt(100, 700)
    },
    fetchPrices: async (hostels) => {
        for (let i = 0; i < hostels.length; i++){
            hostels[i].price = getRandomInt(250, 700)
        }
        return hostels
    }

}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }