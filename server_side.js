const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express()
const maps = require('./maps.js')
const port = process.env.PORT || 80;
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.get('/map',(request,response) => {
	response.render('map_view.hbs', {
		title: 'map page'
	})
})

maps.get_sturbuckses().then((response) => {
	console.log(response.list_of_places);
}).catch((error) => {
	console.log("Error ",error);
})

app.listen(port, () => {
	console.log('Server is up on port 8080');
});