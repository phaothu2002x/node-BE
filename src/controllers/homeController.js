import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
};

const handleUser = async (req, res) => {
    let userList = await userService.getAllUser();
    return res.render("user.ejs", { userList });
};

const handleCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    await userService.createNewUser(email, name, password);

    return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
};

const getUpdateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    if (user && user.length > 0) {
        userData = user[0];
    }

    return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let id = req.body.id;
    await userService.updateUserInfo(email, name, id);
    return res.redirect("/user");
};

module.exports = {
    handleHelloWorld,
    handleUser,
    handleCreateUser,
    handleDeleteUser,
    getUpdateUser,
    handleUpdateUser,
};
