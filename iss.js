const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, ip) =>{

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${ip}`;
      callback(Error(msg), null);
      return;
    }
    else 
    {
      ipAddr = JSON.parse(ip);
      if (ip.length === 0){
        callback(error,null);
      } else {
        callback(null,ipAddr.ip);
      }
    }    
  });
}

const fetchCoordsByIP = function (ip, callback){
  request(`https://freegeoip.app/json/${ip}`, (error, response, coordinates) =>{

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${coordinates}`;
      callback(Error(msg), null);
      return;
    }
    else 
    {
      coordinates = JSON.parse(coordinates);
      if (coordinates.length === 0){
        callback(error,null);
      } else {
        coordinatesObj = {"latitude" : coordinates.latitude , "longitude" : coordinates.longitude};
        callback(null,coordinatesObj);
      }
    }    
  });

}

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, data) =>{

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }
    else 
    {
      data = JSON.parse(data);
      if (data.length === 0){
        callback(error,null);
      } else {
        //coordinatesObj = {"latitude" : coordinates.latitude , "longitude" : coordinates.longitude};
        callback(null,data.response);
      }
    }    
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      callback(error,null);
    }
    fetchCoordsByIP(ip,(error, coordinates) => {
      if (error) {
          console.log("It didn't work!" , error);
          callback(error,null);
      }
      fetchISSFlyOverTimes(coordinates,(error, timeframes) => {
        if (error) {
          console.log("It didn't work!" , error);
          callback(error,null);
        }
        callback(null,timeframes);
      
      });
    });
  });

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };