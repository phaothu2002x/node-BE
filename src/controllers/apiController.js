import loginRegisterService from "../service/loginRegisterService";
const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api",
    });
};

const handleRegister = async (req, res) => {
    try {
        //validate from server
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "missing require parameters", //error message
                EC: "1", //error code
                DT: "", //data
            });
        }
        if (req.body.password && req.body.password.length < 3) {
            return res.status(200).json({
                EM: "your password must more than 3", //error message
                EC: "1", //error code
                DT: "", //data
            });
        }

        //services: create user
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: "", //data
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error", //error message
            EC: "-1", //error code
            DT: "", //data
        });
    }
};

//login
const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);

        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
        }

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "", //data
        });
    }
};

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
};
