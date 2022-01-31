const mongoose = require('mongoose');

// local mongodb url
const url = process.env.MONGODB_URL || 'mongodb://admin:syafiq29_sollab@sollab.dev:27017/papo?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

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