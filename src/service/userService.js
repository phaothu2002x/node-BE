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

const createNewUser = async (email, name, password) => {
    let hashPass = hashUserPassword(password);

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "backend-nodejs",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            "INSERT INTO user (email, username, password) VALUES (?, ?, ?)",
            [email, name, hashPass]
        );
    } catch (error) {
        console.log(error);
    }
};

const getAllUser = async () => {
    // create the connection to database
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "backend-nodejs",
        Promise: bluebird,
    });

    let user = [];
    try {
        const [rows, fields] = await connection.execute("SELECT * FROM user");
        return rows;
    } catch (error) {
        console.log(">>>check error", error);
    }
};

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "backend-nodejs",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            "DELETE FROM user WHERE id=?",
            [id]
        );
        return rows;
    } catch (error) {
        console.log(">>>check error", error);
    }
};

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "backend-nodejs",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            "select * FROM user WHERE id=?",
            [id]
        );
        return rows;
    } catch (error) {
        console.log(">>>check error", error);
    }
};

const updateUserInfo = async (email, name, id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "backend-nodejs",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            "UPDATE user SET email = ?, username = ? WHERE id = ?",
            [email, name, id]
        );
        return rows;
    } catch (error) {
        console.log(">>>check error", error);
    }
};

module.exports = {
    createNewUser,
    getAllUser,
    deleteUser,
    getUserById,
    updateUserInfo,
};

//
