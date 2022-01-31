const mqtt = require("mqtt");
// load broker url from env
const brokerUrl = 'mqtts://mqtt.sollab.dev:8883';

let client;

const connect = () =>
	new Promise((resolve, reject) => {
        if (client && client.connected) {
			return resolve(client);
        }
        
		console.log(brokerUrl);

		// connect to broker
		client = mqtt.connect(brokerUrl, {
            username: process.env.MQTT_USERNAME || 'mqtt',
			password: process.env.MQTT_PASSWORD || 'syafiq29',
		});
        
		client.on("connect", () => {
            console.log("connected to broker");
			client.subscribe("sasaqua/device/+/data");

			return resolve(client);
		});

		client.on("error", reject);
	});

module.exports = { client, connect };
