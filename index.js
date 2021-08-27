const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// const coordinates = fetchCoordsByIP("104.157.66.101",(error, data) => {
//   if (error) {
//       console.log("It didn't work!" , error);
//       return;
//   }
// //  console.log('It worked! Returned IP:' , data);
// //  return data;

// });

// fetchISSFlyOverTimes({ latitude: 50.8805, longitude: -113.9523 },(error, dataNew) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
// //  console.log(coordinates);
// console.log('It worked! Returned IP:' , dataNew);
//   //return data;

// });


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);

});