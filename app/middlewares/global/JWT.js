const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const {
        JWT_PRIVATE_KEY
    } = process.env;

    if(token == null) return res.status(401).json({
        status: false,
        message: 'Unauthorized'
    });
    
    jwt.verify(token, JWT_PRIVATE_KEY, (err, user) => {
        if(err) return res.status(400).json({
            status: false,
            message: 'Invalid Token'
        });
        else {
            req.auth_data = user;
            return next();
        }
    })
}