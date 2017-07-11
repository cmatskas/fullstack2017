let request = require('request');
let azure = require('azure-storage');

module.exports = function (context, myTimer) {
    context.bindings.tableBinding = [];

    const url = `http://api.openweathermap.org/data/2.5/forecast`;
    const qs = { q: process.env['LOCATION'], appid: process.env['API_KEY'] };

    request({url, qs}, (err, {body}) => {
        if (err) {
            return callback(err);
        }

        const data = JSON.parse(body);

        const items = data.list.map((rawRecord) => ({
            PartitionKey: 'londonUK',
            RowKey: String(rawRecord.dt),
            location: process.env['LOCATION'],
            id: String(rawRecord.dt),
            Temp_min: rawRecord.main.temp_min,
            Temp_max: rawRecord.main.temp_max,
            Humidity: rawRecord.main.humidity,
            Weather: rawRecord.weather[0].main,
            Weather_description: rawRecord.weather[0].description,
            Weather_icon: rawRecord.weather[0].icon,
            Wind_speed: rawRecord.wind.speed,
            Wind_deg: rawRecord.wind.deg
        }));

        var tableSvc = azure.createTableService(process.env['StorageConnectionString']);
        tableSvc.createTableIfNotExists('mytable', function(error){
            if(error){
                console.error(error);
            }
        });

        items.map((item) => {
            tableSvc.insertOrReplaceEntity('weatherdata',item, function(error, result) {
                if(error){
                    console.error(error);
                }
            });
        });
    });

    context.done();
};