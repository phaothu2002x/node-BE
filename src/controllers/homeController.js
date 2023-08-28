import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
};

const handleUser = (req, res) => {
    const name = "Thuan";
    res.render("user.ejs", { name });
};

const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;

    userService.createNewUser(email, name, password);

    // check the hash pass (reverse)
    // let check = bcrypt.compareSync(password, hashPassword);

    res.send("successed");
};

module.exports = {
    handleHelloWorld,
    handleUser,
    handleCreateUser,
};
