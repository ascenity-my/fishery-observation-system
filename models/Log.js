const { Schema, models, model, Types } = require('mongoose');

const LogSchema = new Schema({
    device_id: Schema.Types.ObjectId,
    remark: String,
    timestamp: Date,

    values: [{
        label: String,
        value: Number,
    }]
});

module.exports = models.Log || model('Log', LogSchema);