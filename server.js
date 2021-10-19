//Importing necessary packages for a server
const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

//Initializing the server
server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});