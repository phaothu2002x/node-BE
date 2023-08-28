import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

// get the promise implementation, we will use bluebird
import bluebird from "bluebird";

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

const getAllUser = async () => {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "backend-nodejs",
        Promise: bluebird,
    });

    let users = [];
    // connection.query("Select * from users", function (err, results, fields) {
    //     if (err) {
    //         console.log(err);
    //         return users;
    //     }

    //     users = results;
    //     return users;
    // });

    try {
        const [rows, fields] = await connection.execute("SELECT * FROM users");
        return rows;
    } catch (error) {
        console.log(">>>check error", error);
    }
};

module.exports = { createNewUser, getAllUser };
