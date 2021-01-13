module.exports = (req, res, next) => {

    res.header('access-control-request-headers','*');
    
    // browser will allow code from any origin
    res.header('access-control-allow-origin', '*');

    // methods we can use to access responses from a request
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    // which HTTP headers we can use during the request
    res.header('access-control-allow-headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization');
    next();
}