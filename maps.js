// This code finds Starbuckses nearby

const request = require('request');

var get_sturbuckses = (callback) => {
	return new Promise((resolve, reject) => {
		request({
			url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.2827291,-123.1207375&radius=1000&type=coffee&keyword=starbucks&key=AIzaSyD5Z4W9aUlSBLzI4mNzhc4Rl9iqZkqSKMc',
			json: true

		}, (error, response, body) => {
			list_of_places=[];
			if(error){
				reject('Can not connect to Maps');
			}
			else if(body.status=="OK"){
				for(place in body.results){
					list_of_places.push(body.results[place].vicinity);
				}
				resolve(list_of_places);
			}
		});
	});
};

get_sturbuckses().then((response) => {
	console.log(response);
}).catch((error) => {
	console.log("Error ",error);
})

// get_sturbuckses((error,response) => {
// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log(response);
// 	}
// })