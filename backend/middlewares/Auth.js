const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({ "msg": 'Token not provided' });
        }
        
        jwt.verify(token, process.env.secret_key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "msg": 'Token is invalid or has expired' });
            }
            
            req.user = decoded.userId;
            console.log(req.user)
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "msg": 'An error occurred during authorization' });
    }
};

module.exports = {
Auth
};
