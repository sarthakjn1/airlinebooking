const express = require('express');
var bodyParser = require('body-parser')

const { ServerConfig, Logger } = require('./config/index.js');

const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started server on port ${ServerConfig.PORT}`);
});