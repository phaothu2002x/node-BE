import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from "../models/index";
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

    try {
        await db.User.create({
            username: name,
            email: email,
            password: password,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllUser = async () => {
    //test relationship
    // let newUser = await db.User.findOne({
    //     where: { id: 1 },
    //     include: { model: db.Group },
    //     raw: true,
    //     nest: true,
    // });
    // console.log(newUser);

    // create the connection to database
    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     database: "backend-nodejs",
    //     Promise: bluebird,
    // });

    // let user = [];
    // try {
    //     const [rows, fields] = await connection.execute("SELECT * FROM user");
    //     return rows;
    // } catch (error) {
    //     console.log(">>>check error", error);
    // }

    let users = [];
    users = await db.User.findAll();
    return users;
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId, // id là id trong cái table
        },
    });

    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     database: "backend-nodejs",
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         "DELETE FROM user WHERE id=?",
    //         [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>>check error", error);
    // }
};

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id },
    });

    return user.get({ plain: true });

    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     database: "backend-nodejs",
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         "select * FROM user WHERE id=?",
    //         [id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>>check error", error);
    // }
};

const updateUserInfo = async (email, name, id) => {
    await db.User.update(
        {
            email: email,
            username: name,
        },
        { where: { id: id } }
    );
    // const connection = await mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     database: "backend-nodejs",
    //     Promise: bluebird,
    // });

    // try {
    //     const [rows, fields] = await connection.execute(
    //         "UPDATE user SET email = ?, username = ? WHERE id = ?",
    //         [email, name, id]
    //     );
    //     return rows;
    // } catch (error) {
    //     console.log(">>>check error", error);
    // }
};

module.exports = {
    createNewUser,
    getAllUser,
    deleteUser,
    getUserById,
    updateUserInfo,
};

//
