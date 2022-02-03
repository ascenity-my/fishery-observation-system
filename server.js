require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mqtt = require('./services/mqtt.service.js');

const app = express();

app.use(cors());

const port = process.env.PORT || 60000;

/*  */
(async () => {
    try {
        console.log('Connecting to MongoDB...');
        await require('./services/mongodb.service.js').connect();
        
        console.log('Connecting to MQTT broker...');
        await require('./services/mqtt.service').connect();
    
        require('./controllers/mqtt.controller');

        app.use(require('./routes'));
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (e) {
        console.log(e);
    }

})();
