const pool = require("../../config/database");

module.exports = {
    // if we get error it will be passed as data anc callback will be null
    // if execution is successfull then callback will have an data
    create: (data, callback) => {
        pool.query(
            `insert into registration(firstname , lastname, gender, email, password, number)
            values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error)
                }
                return callback(null, results)
            }
        )
    }
}
