

const distanceDifference = (origin, restOptions) => {
    // assume maybe we just send an array of the resturaunts in the same state and same type (vegan, veg, etc.) that have meals to offer?
    // origin to be object with lat, long and distance pref of NPO
    // rest options to be an array with objects, containign rest id, long and lat,
    
    // using Haversine formula
    
    const degreesToRadians = (deg) => {
        return deg * Math.PI / 180;
    }

    const withinDist = [];
    const earthRadius = 6371; // km

    restOptions.forEach(rest => {
        const dLat = degreesToRadians(origin.lat - rest.lat);
        const dLng = degreesToRadians(origin.lng - rest.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degreesToRadians(rest.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = earthRadius * c;
        const distanceMi = distanceKm / 1.609; //convert km to mi

        if (distanceMi <= origin.distance_pref){
            withinDist.push(rest.id)
        }

    })

    return withinDist 

}


module.exports = distanceDifference;