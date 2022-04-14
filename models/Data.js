const { Schema, models, model, Types } = require('mongoose');

const DataSchema = new Schema({
    device_id: Schema.Types.ObjectId,
    values: {
        oxy: Number,
        ph: Number,
        temp: Number,
        sal: Number,
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

    const oxy = data.map(d => d.values.oxy);
    const ph = data.map(d => d.values.ph);
    const temp = data.map(d => d.values.temp);
    const sal = data.map(d => d.values.sal);
    
    const oxy_avg = oxy.reduce((a, b) => a + b, 0) / oxy.length;
    const ph_avg = ph.reduce((a, b) => a + b, 0) / ph.length;
    const temp_avg = temp.reduce((a, b) => a + b, 0) / temp.length;
    const sal_avg = sal.reduce((a, b) => a + b, 0) / sal.length;

    return {
        date: data[0].timestamp,
        value: {
            oxy: oxy_avg, ph: ph_avg, temp: temp_avg, sal: sal_avg,
        }
    };
};

DataSchema.statics.getLatestAverage = async function (device_id) {
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
                _id: -1,
            },
        },
    ]).limit(1);

    if (!data || data.length === 0) {
        return [];
    }

    const oxy = data.map(d => d.values.map(v => v.oxy));
    const ph = data.map(d => d.values.map(v => v.ph));
    const temp = data.map(d => d.values.map(v => v.temp));
    const sal = data.map(d => d.values.map(v => v.sal));

    const oxy_avg = oxy.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const ph_avg = ph.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const temp_avg = temp.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const sal_avg = sal.map(d => d.reduce((a, b) => a + b, 0) / d.length);

    const averages = [];
    for (let i = 0; i < oxy_avg.length; i++) {
        const date = new Date(data[i]._id.year, data[i]._id.month - 1, data[i]._id.day, data[i]._id.hour);

        averages.push({
            date: date,
            oxy: oxy_avg[i],
            ph: ph_avg[i],
            temp: temp_avg[i],
            sal: sal_avg[i],
            count: data[i].values.length,
        });
    }

    // invert the array
    return averages.reverse();
}

DataSchema.statics.getLatestAverages = async function (device_id, total) {
    // using aggregation
    // group all latest data hourly
    // calculate average for each group
    // return the latest total number of averages
    
    const data = await this.aggregate([
        {
            $match: {
                device_id: Types.ObjectId(device_id),

                 // data from 0000 to 2359
                timestamp: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
                    $lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59),
                },
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
                _id: -1,
            },
        },
    ]).limit(parseInt(total) || 24);

    if (!data || data.length === 0) {
        return [];

    }

    const oxy = data.map(d => d.values.map(v => v.oxy));
    const ph = data.map(d => d.values.map(v => v.ph));
    const temp = data.map(d => d.values.map(v => v.temp));
    const sal = data.map(d => d.values.map(v => v.sal));

    const oxy_avg = oxy.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const ph_avg = ph.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const temp_avg = temp.map(d => d.reduce((a, b) => a + b, 0) / d.length);
    const sal_avg = sal.map(d => d.reduce((a, b) => a + b, 0) / d.length);

    const averages = [];
    for (let i = 0; i < oxy_avg.length; i++) {
        const date = new Date(data[i]._id.year, data[i]._id.month - 1, data[i]._id.day, data[i]._id.hour);

        averages.push({
            date: date,
            oxy: oxy_avg[i],
            ph: ph_avg[i],
            temp: temp_avg[i],
            sal: sal_avg[i],
            count: data[i].values.length,
        });
    }

    // invert the array
    return averages.reverse();
}

DataSchema.statics.getOverallAverages = async function (device_id) {
    const data = await this.find({ device_id: Types.ObjectId(device_id) });

    if (!data || data.length === 0) {
        return [];
    }

    const oxy = data.map(d => d.values.oxy ? d.values.oxy : 0);
    const ph = data.map(d => d.values.ph ? d.values.ph : 0);
    const temp = data.map(d => d.values.temp ? d.values.temp : 0);
    const sal = data.map(d => d.values.sal ? d.values.sal : 0);

    const oxy_avg = oxy.reduce((a, b) => a + b, 0) / oxy.length;
    const ph_avg = ph.reduce((a, b) => a + b, 0) / ph.length;
    const temp_avg = temp.reduce((a, b) => a + b, 0) / temp.length;
    const sal_avg = sal.reduce((a, b) => a + b, 0) / sal.length;

    return {
        oxy: {
            value: oxy_avg,
        },
        ph: {
            value: ph_avg,
        },
        temp: {
            value: temp_avg,
        },
        sal: {
            value: sal_avg,
        },
        count: data.length,
    };
}

DataSchema.statics.getHighest = async function (device_id) {
    const data = await this.find({ device_id: Types.ObjectId(device_id) });

    if (!data || data.length === 0) {
        return [];
    }

    const oxy = data.map(d => d.values.oxy ? d.values.oxy : 0);
    const ph = data.map(d => d.values.ph ? d.values.ph : 0);
    const temp = data.map(d => d.values.temp ? d.values.temp : 0);
    const sal = data.map(d => d.values.sal ? d.values.sal : 0);

    const oxy_max = Math.max(...oxy);
    const ph_max = Math.max(...ph);
    const temp_max = Math.max(...temp);
    const sal_max = Math.max(...sal);

    return {
        oxy: oxy_max,
        ph: ph_max,
        temp: temp_max,
        sal: sal_max,
    };
}
DataSchema.statics.getHighestHourly = async function (device_id) {
    const data = await this.find({
        device_id: Types.ObjectId(device_id),
        timestamp: {
            $gte: new Date(new Date().getTime() - 3600000),
        },
    });

    if (!data || data.length === 0) {
        return [];
    }

    const oxy = data.map(d => d.values.oxy ? d.values.oxy : 0);
    const ph = data.map(d => d.values.ph ? d.values.ph : 0);
    const temp = data.map(d => d.values.temp ? d.values.temp : 0);
    const sal = data.map(d => d.values.sal ? d.values.sal : 0);

    const oxy_max = Math.max(...oxy);
    const ph_max = Math.max(...ph);
    const temp_max = Math.max(...temp);
    const sal_max = Math.max(...sal);

    return {
        oxy: oxy_max,
        ph: ph_max,
        temp: temp_max,
        sal: sal_max,
    };
}

DataSchema.statics.getBoundsHourly = async function (device_id, total) {
    // get all data within the last 1 hour
    const data = await this.find({
        device_id: Types.ObjectId(device_id),
        timestamp: {
            $gte: new Date(new Date().getTime() - 3600000),
        },
    });

    if (!data || data.length === 0) {
        return [];
    }

    const oxy = data.map(d => d.values.oxy ? d.values.oxy : 0);
    const ph = data.map(d => d.values.ph ? d.values.ph : 0);
    const temp = data.map(d => d.values.temp ? d.values.temp : 0);
    const sal = data.map(d => d.values.sal ? d.values.sal : 0);

    const oxy_max = Math.max(...oxy);
    const ph_max = Math.max(...ph);
    const temp_max = Math.max(...temp);
    const sal_max = Math.max(...sal);

    const oxy_min = Math.min(...oxy);
    const ph_min = Math.min(...ph);
    const temp_min = Math.min(...temp);
    const sal_min = Math.min(...sal);

    return {
        oxy: [oxy_min, oxy_max],
        ph: [ph_min, ph_max],
        temp: [temp_min, temp_max],
        sal: [sal_min, sal_max],
    };
}

module.exports = models.Data || model('Data', DataSchema);