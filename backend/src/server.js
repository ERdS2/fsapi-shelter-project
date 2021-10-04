const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();
const path = require('path');

const staticUrl = path.join(__dirname, '..', 'public', "angular")

//swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use(express.json());

app.use('/', (req, res, next) => {
    console.log(`HTTP ${req.method} ${req.path}`);
    next();
});

app.use('/adoption', require('./controller/adoption/adoption.routes'));
app.use('/pets', require('./controller/pet/pet.routes'));
app.use('/users', require('./controller/user/user.routes'));

//Authorization
const authHandler = require('./auth/authHandler');

app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

//swagger
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use('/', express.static(staticUrl))

app.use((err, req, res, next) => {
    console.error(`ERROR: ${err.stack}: ${err.message}`);
    res.status(err.statusCode);
    res.json({
        hasError:true,
        message: err.message
    })
});

module.exports = app;


