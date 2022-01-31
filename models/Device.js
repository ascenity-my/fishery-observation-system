const { Schema, models, model } = require('mongoose');

const DeviceSchema = new Schema({
    name: String,
    description: String,
});

module.exports = models.Device || model('Device', DeviceSchema);