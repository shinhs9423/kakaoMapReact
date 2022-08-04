const axios = require('axios');
const serviceKey = require('./config/key');
const aqiUrl = require('./config/url');

const axdata = async (stationName, callback) => {
    const url = aqiUrl.busRouteListUrl
    const ServiceKey = docodeURIComponent(serviceKey.publickPortalKey)

    try{
        const response = await axios.get(url, {
            params : {
                ServiceKey : serviceKey,
                stationName : stationName,
                _type : 'json'
            }
        })
        const data = response.data.busRouteList.item;
        const busline = data
        callback(undefined, {busline})
    } catch (error) {
        console.log('error borke out :', error)
    }
}

module.exports = axdata;