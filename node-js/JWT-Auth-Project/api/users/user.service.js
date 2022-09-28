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
    },
    getUsers: callback => {
        pool.query(
            `select id, firstname, lastname , email , gender, number from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    },
    getUserById: (id, callback) => {
        pool.query(
            `select id, firstname, lastname , email , gender, number from registration where id= ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results);
            }
        )
    },
    updateUser: (id, data, callback) => {
        pool.query(
            `update registration set firstname = ?, lastname = ? , email =? , gender = ?, password = ? , number = ? where id= ?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.gender,
                data.password,
                data.number,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0]);
            }
        )
    },
    delete: (id, callback) => {
        pool.query(
            `delete from registration where id = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    }

}
