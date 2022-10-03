const jwt = require('jsonwebtoken');

export async function isAunthicated(req, res, next) {
    // Bearer <token>
    const token = req.headers('authorization').split(' ')[1];

    jwt.verify(token, 'secret', (err, user) => {
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