import db from "../models/index";

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

const createUser = async (data) => {
    try {
        await db.User.create({});
    } catch (e) {
        console.log(e);
    }
};

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            //update
            user.save({});
        } else {
            //not found
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id: id },
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
