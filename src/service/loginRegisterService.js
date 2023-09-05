import db from "../models/index";
import bcrypt from "bcryptjs";

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

module.exports = {
    registerNewUser,
};
