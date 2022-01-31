const { Schema, models, model, Types } = require('mongoose');

const DataSchema = new Schema({
    device_id: Schema.Types.ObjectId,
    values: {
        tds: Number,
        oxy: Number,
        ph: Number,
        temp: Number,
    },
    timestamp: Date,
});

DataSchema.statics.store = async function(device_id, values) {
    const data = await this.create({
        device_id, values, timestamp: Date.now()
    });

    return data;
}

DataSchema.statics.getData = async function (device_id, limit) {
    const data = await this.find({ device_id: device_id }).sort({ timestamp: -1 }).limit(parseInt(limit));
    return data;
};

DataSchema.statics.getDataInTimeRange = async function (device_id, start, end) {
    const data = await this.find({ device_id: device_id, timestamp: { $gte: start, $lte: end } });
    return data;
};
 
DataSchema.statics.getAverage = async function (device_id, start, end) {
    const data = await this.find({ device_id: device_id, timestamp: { $gte: start, $lte: end } });

    if (!data || data.length === 0) {
        return [];
    }

    const tds = data.map(d => d.values.tds);
    const oxy = data.map(d => d.values.oxy);
    const ph = data.map(d => d.values.ph);
    const temp = data.map(d => d.values.temp);
    
    const tds_avg = tds.reduce((a, b) => a + b, 0) / tds.length;
    const oxy_avg = oxy.reduce((a, b) => a + b, 0) / oxy.length;
    const ph_avg = ph.reduce((a, b) => a + b, 0) / ph.length;
    const temp_avg = temp.reduce((a, b) => a + b, 0) / temp.length;

    return {
        date: data[0].timestamp,
        value: {
            tds: tds_avg, oxy: oxy_avg, ph: ph_avg, temp: temp_avg
        }
    };
};

DataSchema.statics.getLatestAverages = async function (device_id, total) {
    // using aggregation
    // group all latest data hourly
    // calculate average for each group
    // return the latest total number of averages

    const data = await this.aggregate([
        {
            $match: {
                device_id: Types.ObjectId(device_id),
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$timestamp" },
                    month: { $month: "$timestamp" },
                    day: { $dayOfMonth: "$timestamp" },
                    hour: { $hour: "$timestamp" },
                },
                values: { $push: "$values" },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
    ]);

    if (!data || data.length === 0) {
        return [];

    }

    const tds = data.map(d => d.values.map(v => v.tds));
    const oxy = data.map(d => d.values.map(v => v.oxy));
    const ph = data.map(d => d.values.map(v => v.ph));
    const temp = data.map(d => d.values.map(v => v.temp));

    const tds_avg = tds.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const oxy_avg = oxy.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const ph_avg = ph.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const temp_avg = temp.map(d => d.reduce((a, b) => a + b, 0) / d.length);

    const averages = [];
    for (let i = 0; i < tds_avg.length; i++) {
        const date = new Date(data[i]._id.year, data[i]._id.month, data[i]._id.day, data[i]._id.hour);

        averages.push({
            date: date,
            tds: tds_avg[i],
            oxy: oxy_avg[i],
            ph: ph_avg[i],
            temp: temp_avg[i],
            count: data[i].values.length,
        });
    }

    return averages.slice(averages.length - total);
}

DataSchema.statics.getOverallAverages = async function (device_id) {
    const data = await this.find({ device_id: Types.ObjectId(device_id) });

    if (!data || data.length === 0) {
        return [];
    }

    const tds = data.map(d => d.values.tds);
    const oxy = data.map(d => d.values.oxy);
    const ph = data.map(d => d.values.ph);
    const temp = data.map(d => d.values.temp);

    const tds_avg = tds.reduce((a, b) => a + b, 0) / tds.length;
    const oxy_avg = oxy.reduce((a, b) => a + b, 0) / oxy.length;
    const ph_avg = ph.reduce((a, b) => a + b, 0) / ph.length;
    const temp_avg = temp.reduce((a, b) => a + b, 0) / temp.length;

    return {
        tds: {
            value: tds_avg,
        },
        oxy: {
            value: oxy_avg,
        },
        ph: {
            value: ph_avg,
        },
        temp: {
            value: temp_avg,
        },
        count: data.length,
    };
}

DataSchema.statics.getHighest = async function (device_id) {
    const data = await this.find({ device_id: Types.ObjectId(device_id) });

    if (!data || data.length === 0) {
        return [];
    }

    const tds = data.map(d => d.values.tds);
    const oxy = data.map(d => d.values.oxy);
    const ph = data.map(d => d.values.ph);
    const temp = data.map(d => d.values.temp);

    const tds_max = Math.max(...tds);
    const oxy_max = Math.max(...oxy);
    const ph_max = Math.max(...ph);
    const temp_max = Math.max(...temp);

    return {
        tds: tds_max,
        oxy: oxy_max,
        ph: ph_max,
        temp: temp_max,
    };
}

module.exports = models.Data || model('Data', DataSchema);