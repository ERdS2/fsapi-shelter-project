require('dotenv').config();
const app = require('./server');
const config = require('config');
const port = process.env.PORT || 3000;
const logger = require('../config/logger');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

if (!config.has('database')) {
    logger.error('Database config not found')
    process.exit()
}

const mogoConnectionString = `mongodb+srv://${config.get('database.username')}:${config.get('database.password')}@${config.get('database.host')}`

mongoose.connect(mogoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    logger.info('Mongodb connection is sucessfull');
}).catch((err)=>{
    logger.error(err);
    process.exit();
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

