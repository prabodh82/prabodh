const { hashSync, genSaltSync } = require("bcrypt");
const { create, getUsers, getUserById, updateUser, delete: deleteUser } = require("./user.service");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            } if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found!"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(id, body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success: 0,
                    data: "failed to update user."
                })
            }
            return res.json({
                success: 1,
                data: "Updates successfully."
            })
        })
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser (id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: "User deleted successfully."
            })
        })
    },
}