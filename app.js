const express = require('express');
const app = express();

app.get('/', function(request, response) {
	response.end('Hola mundo!');
});

app.listen(3000);
console.info('Listening on port 3000...');