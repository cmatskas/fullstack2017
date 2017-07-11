var moment = require("moment-timezone");

module.exports = function (context, req) {
    context.log('TimezoneConversionJS function processed a request.');
    
    const {timestamp, sourceTimezone, targetTimezone} = req.query;

   if(timestamp || sourceTimezone || targetTimezone){
        const resultTimestamp = moment.tz(timestamp, sourceTimezone).tz(targetTimezone).format();
        context.res = {
            body: `timestamp: ${resultTimestamp}` 
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Missing parameters in the query string. Please check and try again"
        };
    }
    
    context.done();
};