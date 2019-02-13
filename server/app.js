var hostelFectching = require("./getHostelList")
var {loadHostels, updateHostels} = hostelFectching

async function startup(){
    hostels = await updateHostels()
    console.log(hostels)
}

startup()
