module.exports = function (context, req) {
    context.log('HelloWorldJS function processed a request.');
    context.res = { 
        body: "Hello World"
    };
    
    context.done();
};