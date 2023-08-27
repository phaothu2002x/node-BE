const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
};

const handleUser = (req, res) => {
    const name = "Thuan";
    res.render("user.ejs", { name });
};

module.exports = {
    handleHelloWorld,
    handleUser,
};
