const jwt = require('jsonwebtoken');

module.exports = async function isAunthicated(req, res, next) {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, 'secert', (err, user) => {
        if (err) {
            res.json({
                success: 0,
                message: 'unathorized'
            })
        } else {
            req.user = user;
            next();
        }
    })

}