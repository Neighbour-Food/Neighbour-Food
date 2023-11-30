const axios = require('axios');
const { response } = require('express');
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getCoordsForAddress = async(address) => {
    const formatedAddress = address.slice(0,-5);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formatedAddress)}&key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;


    //autofill address so must exist
    // if (!data || data.status === 'ZERO_RESULTS'){
    //     what to return if address not found
    //     shouldnt be an issue if we have auto complete address 
    // }
    const coordinates = data.results[0].geometry.location;

    return coordinates
}

module.exports = getCoordsForAddress;