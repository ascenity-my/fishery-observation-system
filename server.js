require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mqtt = require('./services/mqtt.service.js');

const app = express();

app.use(cors());

/*  */
(async () => {
    try {
        /* establish connections to DB and MQTT service */
        await require('./services/mongodb.service.js').connect();
        await require('./services/mqtt.service').connect();
    
        require('./controllers/mqtt.controller');

        app.use(require('./routes'));
        
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (e) {
        console.log(e);
    }

})();
