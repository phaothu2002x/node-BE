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

const handleLogin = async (req, res) => {
    console.log(">>>check login", req.body);
    return res.status(200).json({
        message: "ok",
        data: "test api login",
    });
};

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
};
