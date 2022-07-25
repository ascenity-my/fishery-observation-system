const mqtt = require('../services/mqtt.service.js');

const Device = require('../models/Device.js');
const Data = require('../models/Data.js');
const Log = require('../models/Log.js');

const parseData = (payload) => {
    let res = {};

    payload.toString().split('&').forEach(item => {
        const [key, value] = item.split('=');
        res[key] = value;
    });

    return res;
};

const logSignalStrenght = (device, payload) => {
    if (payload.rssi) {
        const data = {
            device_id: device._id,
            remark: `${device.name} signal strength: ${payload.rssi}`,
            timestamp: Date.now(),
            values: [
                {
                    label: 'rssi',
                    value: payload.rssi,
                },
            ]
        };

        return Log.create(data);
    }

    return Promise.resolve();
};

(async () => {
    const client = await mqtt.connect();
    
    client.on('message', async (topic, message) => {
        const dir = topic.split('/');
    
        try {
            if (dir[1] === 'device' && dir[3] === 'data') {
                const name = dir[2];
                const data = parseData(message);
    
                let device = await Device.findOne({ name });
    
                if (!device) {
                    device = await Device.create({
                        name,
                        description: data.description,
                    });
    
                    client.publish('sasaqua/server/state', "NEWDEVICE");
                }
    
                await Data.create({
                    device_id: device._id,
                    values: {
                        oxy: data.oxy,
                        ph: data.ph,
                        temp: data.temp,
                        sal: data.sal || data.salinity,
                    },
                    timestamp: Date.now(),
                });
    
                // notify the frontend to request for device updates
                client.publish('sasaqua/server/state', "UPDATE:" + name);

                // log signal strength (if available)
                /* await logSignalStrenght(device, data); */
            }
    
        } catch(e) {
            console.log("ERROR:", e.message);
        }
    });
})();
