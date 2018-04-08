// This code finds Starbuckses nearby

const request = require('request');
var list_of_places=[];

var request_coodrs = () => {
	return new Promise((resolve,reject) => {
		request({
			url: 'http://freegeoip.net/json'
		}, (error, response, body)=> {
			if(error){
				reject('Cannot connect')
			}
			else{
				resolve(body);
			}
		})
	})
}


// request_coodrs().then((response) => {
// 	lat = response.latitude;
// 	lng = response.longitude;
// }).catch((error) => {
// 	console.log('Error: ',error);
// })

var get_sturbuckses = (lat,lng) => {
	return new Promise((resolve, reject) => {
		request({
			url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=coffee&keyword=starbucks&key=AIzaSyD5Z4W9aUlSBLzI4mNzhc4Rl9iqZkqSKMc`,
			json: true

		}, (error, response, body) => {
			
			if(error){
				reject('Can not connect to Maps');
			}
			else if(body.status=="OK"){
				for(place in body.results){
					list_of_places.push(body.results[place].vicinity);
				}
				resolve({body,list_of_places});
			}
		});
	});
};



module.exports ={
	get_sturbuckses,
	request_coodrs
};

// get_sturbuckses().then((response) => {
// 	console.log(response);
// }).catch((error) => {
// 	console.log("Error ",error);
// })