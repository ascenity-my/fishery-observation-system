const mongoose = require('mongoose');

// local mongodb url
const url = process.env.MONGODB_URL;

// async function for mongodb connection
const connect = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB');
};

module.exports = { connect };