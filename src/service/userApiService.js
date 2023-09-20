import db from "../models/index";
import {
    checkEmailExist,
    checkPhone,
    hashUserPassword,
} from "./loginRegisterService";
const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });
        if (users) {
            // let data = users.get({ plain: true });
            return {
                EM: "get data success",
                EC: 0,
                DT: users,
            };
        } else {
            return {
                EM: "get data success",
                EC: 0,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with services",
            EC: 1,
            DT: [],
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: {
                model: db.Group,
                attributes: ["name", "description", "id"],
            },
            order: [["id", "DESC"]],
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPage: totalPages,
            users: rows,
        };
        return {
            EM: "fetch OK",
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with services",
            EC: 1,
            DT: [],
        };
    }
};

const createUser = async (data) => {
    try {
        //check email/phone is already is exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "Email is already exist",
                EC: 1,
                DT: "email",
            };
        }
        let isPhoneExist = await checkPhone(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: "phone is already exist",
                EC: 1,
                DT: "phone",
            };
        }

        //hash user password
        let hashPassword = hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: "Create OK",
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
    }
};

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with empty GroupId",
                EC: 1,
                DT: "group",
            };
        }
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            //update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            });

            return {
                EM: "Update user succeed ",
                EC: 0,
                DT: "",
            };
        } else {
            //not found
            return {
                EM: "User not found",
                EC: 2,
                DT: "",
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with services",
            EC: 1,
            DT: [],
        };
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id },
        });

        if (user) {
            await user.destroy();
            return {
                EM: "delete user success",
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: "User not exist",
                EC: 2,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "error from service",
            EC: 1,
            DT: [],
        };
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
};
