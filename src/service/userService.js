import bcrypt from "bcryptjs";
import mysql from "mysql2";
// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "backend-nodejs",
});

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    //hash the pass
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = (email, name, password) => {
    let hashPass = hashUserPassword(password);

    connection.query(
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
        [email, name, hashPass],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
};

const getAllUser = () => {
    let users = [];
    connection.query("Select * from users", function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = { createNewUser, getAllUser };
