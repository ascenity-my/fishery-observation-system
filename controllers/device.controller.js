const Device = require('../models/Device');
const Data = require('../models/Data');

module.exports = {
    getAll: async (req, res) => {
        try {
            const devices = await Device.find();
            res.status(200).json(devices);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getData: async (req, res) => {
        try {
            const { id, limit } = req.query;

            if (!id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!limit) {
                res.status(400).json({ message: 'Missing limit' });
            }

            const data = await Data.getData(id, limit);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getDataInTimeRange: async (req, res) => {
        try {
            const { device_id, start, end } = req.query;

            if (!device_id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!start) {
                res.status(400).json({ message: 'Missing start' });
            }

            if (!end) {
                res.status(400).json({ message: 'Missing end' });
            }

            const data = await Data.getDataInTimeRange(device_id, start, end);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAverage: async (req, res) => {
        try {
            const { device_id, start, end } = req.query;

            if (!device_id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!start) {
                res.status(400).json({ message: 'Missing start' });
            }

            if (!end) {
                res.status(400).json({ message: 'Missing end' });
            }

            const data = await Data.getAverage(device_id, start, end);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getHourlyAverage: async (req, res) => {
        try {
            const { device_id, total_hours } = req.query;

            if (!device_id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!total_hours) {
                res.status(400).json({ message: 'Missing total_hours' });
            }

            const start = new Date();
            start.setHours(start.getHours() - parseInt(total_hours));

            const data = await Data.getAverage(device_id, start, new Date());

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getLatestAverages: async (req, res) => {
        try {
            const { device_id, total } = req.query;

            if (!device_id) {
                res.status(400).json({ message: 'Missing device_id' });
            }

            if (!total) {
                res.status(400).json({ message: 'Missing total' });
            }

            const data = await Data.getLatestAverages(device_id, total);

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getAllLatestAverages: async (req, res) => {
        try {
            const { total } = req.query;

            const devices = await Device.find();

            const data = [];

            for (let i = 0; i < devices.length; i++) {
                const device = devices[i];
                const deviceData = await Data.getLatestAverages(device._id, total);

                data.push({
                    device_id: device._id,
                    device_name: device.name,
                    data: deviceData
                });
            }

            // sort by data.data.date
            data.sort((a, b) => {
                return new Date(b.data[0].date) - new Date(a.data[0].date);
            });

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getOverallAverage: async (req, res) => {
        try {
            const devices = await Device.find();

            const data = [];

            for (let i = 0; i < devices.length; i++) {
                const device = devices[i];
                const deviceData = await Data.getOverallAverages(device._id);

                data.push({
                    device_id: device._id,
                    device_name: device.name,
                    data: deviceData
                });
            }

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getHighest: async (req, res) => {
        try {
            const devices = await Device.find();

            const data = [];

            const oxy = [0];
            const temp = [0];
            const ph = [0];
            const sal = [0];

            let highestOxy = {
                device_id: '',
                device_name: '',
                value: 0
            };
            let highestTemp = {
                device_id: '',
                device_name: '',
                value: 0
            };
            let highestPh = {
                device_id: '',
                device_name: '',
                value: 0
            };
            let highestSal = {
                device_id: '',
                device_name: '',
                value: 0
            };

            for (let i = 0; i < devices.length; i++) {
                const device = devices[i];
                const deviceData = await Data.getHighest(device._id);

                if (deviceData.oxy > highestOxy.value) {
                    oxy.push(deviceData.oxy);
                    
                    highestOxy = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }
                }

                if (deviceData.temp > highestTemp.value) {
                    temp.push(deviceData.temp);

                    highestTemp = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }

                }

                if (deviceData.ph > highestPh.value) {
                    ph.push(deviceData.ph);

                    highestPh = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }

                }

                if (deviceData.sal > highestSal.value) {
                    sal.push(deviceData.sal);

                    highestSal = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }

                }

            }

            highestOxy.value = Math.max(...oxy);
            highestTemp.value = Math.max(...temp);
            highestPh.value = Math.max(...ph);
            highestSal.value = Math.max(...sal);

            res.status(200).json({
                oxy: highestOxy,
                temp: highestTemp,
                ph: highestPh,
                sal: highestSal
            });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getHighestAllHourly: async (req, res) => {
        try {
            const devices = await Device.find();

            const data = [];

            const oxy = [0];
            const temp = [0];
            const ph = [0];
            const sal = [0];

            let highestOxy = {
                device_id: '',
                device_name: '',
                value: 0
            };
            let highestTemp = {
                device_id: '',
                device_name: '',
                value: 0
            };
            let highestPh = {
                device_id: '',
                device_name: '',
                value: 0
            };
            let highestSal = {
                device_id: '',
                device_name: '',
                value: 0
            };

            for (let i = 0; i < devices.length; i++) {
                const device = devices[i];
                const deviceData = await Data.getHighestHourly(device._id);

                if (deviceData.oxy > highestOxy.value) {
                    oxy.push(deviceData.oxy);
                    
                    highestOxy = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }
                }

                if (deviceData.temp > highestTemp.value) {
                    temp.push(deviceData.temp);

                    highestTemp = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }

                }

                if (deviceData.ph > highestPh.value) {
                    ph.push(deviceData.ph);

                    highestPh = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }

                }

                if (deviceData.sal > highestSal.value) {
                    sal.push(deviceData.sal);

                    highestSal = {
                        device_id: device._id,
                        device_name: device.name,
                        value: 0
                    }

                }

            }

            highestOxy.value = Math.max(...oxy);
            highestTemp.value = Math.max(...temp);
            highestPh.value = Math.max(...ph);
            highestSal.value = Math.max(...sal);

            res.status(200).json({
                oxy: highestOxy,
                temp: highestTemp,
                ph: highestPh,
                sal: highestSal
            });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    getBoundsAllHourly: async (req, res) => {
        try {
            const devices = await Device.find();

            const data = {
                oxy: [],
                temp: [],
                ph: [],
                sal: []
            };

            for (let device of devices) {
                const deviceData = await Data.getBoundsHourly(device._id);

                Object.keys(deviceData).forEach(key => {
                    if (data[key].length === 0) {
                        data[key].push({
                            device_id: device._id,
                            device_name: device.name,
                            value: deviceData[key][0]
                        })
                    } else if (deviceData[key][0] < data[key][0].value) {
                        data[key][0] = {
                            device_id: device._id,
                            device_name: device.name,
                            value: deviceData[key][0]
                        }
                    }

                    if (data[key].length === 1) {
                        data[key].push({
                            device_id: device._id,
                            device_name: device.name,
                            value: deviceData[key][1]
                        })
                    } else if (deviceData[key][1] > data[key][1].value) {
                        data[key][1] = {
                            device_id: device._id,
                            device_name: device.name,
                            value: deviceData[key][1]
                        }
                    }
                });
            }
            
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
};