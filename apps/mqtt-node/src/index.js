const mqtt = require('mqtt');

// Replace 'your-mqtt-broker-url' with the actual URL of your MQTT broker
const brokerUrl = 'mqtt://broker.hivemq.com:1883';

// Create an MQTT client
const client = mqtt.connect(brokerUrl, {
    clientId: "default_client_id",
    clean: true,
    rejectUnauthorized: false,
});

// Subscribe to a topic
const topic = 'mj/2C:54:91:88:C9:E3-node1';
client.subscribe(topic, { qos: 2 }, (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (error) {
        return;
    }
});

// Handle incoming messages
client.on('message', (receivedTopic, message) => {
    console.log(`Received message on topic '${receivedTopic}': ${message.toString()}`);
});

// Handle subscription events
client.on('subscribe', (granted) => {
    console.log(`Subscribed to topic '${topic}' with QoS ${granted[0].qos}`);
});

// Handle connection events
client.on('connect', () => {
    console.log('Connected to MQTT broker');


});

client.on('error', (error) => {
    console.error('MQTT connection error:', error);
});

client.on('close', () => {
    console.log('MQTT connection closed');
});

client.on("offline", () => {
    console.log("client go offline");
});