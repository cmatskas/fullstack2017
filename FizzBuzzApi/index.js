module.exports = function (context, req) {
    context.log('FizzBuzz function processed a request.');

    if (req.body && req.body.number) {
        
        const number = parseInt(req.body.number);
        
        if (Number.isNaN(number) || !Number.isInteger(number) || number <= 0) {
            context.res = {
                status: 400,
                body: "Invalid body, a positive integer was expected"
            };
        }
        else {
            const result = (
                number % 3 === 0 && number % 5 === 0 ? 'Fizz Buzz'
                : number % 3 === 0 ? 'Fizz'
                : number % 5 === 0 ? 'Buzz'
                : number
            );
            
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: result
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass an integer in the query string or in the request body"
        };
    }

    context.done();
};