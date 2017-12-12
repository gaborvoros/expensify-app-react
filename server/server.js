//get plugins
const path = require('path');
const express = require('express');
const app = express();
//path to public folder where the build files are
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

//as there are no html subpages and subfolders on prod like 'localhost:3000/create', it will get an error upon pagerefresh
app.get('*', (req, res) => {
	//process all unhandled requests from index.html
	res.sendFile(path.join(publicPath, 'index.html'));
});

//create server on port 3000
app.listen(3000, () => {
	console.log('server runs');
});

//runs with node server/server.js