const mqtt = require("mqtt");
// load broker url from env
const brokerUrl = process.env.MQTT_BROKER_URL;

let client;

const connect = () =>
	new Promise((resolve, reject) => {
        if (client && client.connected) {
			return resolve(client);
        }
        
		// connect to broker
		client = mqtt.connect(brokerUrl, {
            username: process.env.MQTT_USERNAME,
			password: process.env.MQTT_PASSWORD,
		});
        
		client.on("connect", () => {
            console.log("connected to broker");
			client.subscribe("sasaqua/device/+/data");

			return resolve(client);
		});

		client.on("error", reject);
	});

module.exports = { client, connect };
