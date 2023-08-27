import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "backend-nodejs",
});

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

    connection.query(
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
        [email, name, password],
        function (err, results, fields) {
            console.log(results);
        }
    );

    res.send("successed");
};

module.exports = {
    handleHelloWorld,
    handleUser,
    handleCreateUser,
};
