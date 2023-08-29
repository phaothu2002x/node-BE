import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
};

const handleUser = async (req, res) => {
    let userList = await userService.getAllUser();
    return res.render("user.ejs", { userList });
};

const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    userService.createNewUser(email, name, password);

    return res.redirect("/user");

    // check the hash pass (reverse)
    // let check = bcrypt.compareSync(password, hashPassword);
};

const handleDelteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
};

module.exports = {
    handleHelloWorld,
    handleUser,
    handleCreateUser,
    handleDelteUser,
};
