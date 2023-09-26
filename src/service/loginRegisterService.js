require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";

//harsh password
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    //hash the pass
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail },
    });
    if (user) {
        return true;
    }
    return false;
};

const checkPhone = async (userPhone) => {
    let phone = await db.User.findOne({
        where: { phone: userPhone },
    });

    if (phone) {
        return true;
    }
    return false;
};

const registerNewUser = async (rawUserData) => {
    try {
        //check email/phone is already is exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: "Email is already exist",
                EC: 1,
            };
        }
        let isPhoneExist = await checkPhone(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: "phone is already exist",
                EC: 1,
            };
        }

        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
            groupId: 4,
        });

        return {
            EM: "New User is created successfully",
            EC: 0,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong in server...",
            EC: -2,
        };
    }
};

//login

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ],
            },
        });
        //checking (a note)
        // console.log(">>> check user javascript object: ", user.get({plain: true}));
        // console.log(">>> check user sequelize object: ", user;
        if (user) {
            let isCorrectPassword = checkPassword(
                rawData.password,
                user.password
            );

            if (isCorrectPassword) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN,
                };
                let token = createJWT(payload);
                return {
                    EM: "Ok",
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                    },
                };
            }
        }

        return {
            EM: "Your email/phone number or password is incorrect",
            EC: 1,
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong in server...",
            EC: -2,
        };
    }
};

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
    checkPhone,
};
