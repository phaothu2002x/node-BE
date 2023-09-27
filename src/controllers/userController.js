import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
    try {
        console.log("cookies: ", req.cookies);
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            // nó trả về chuỗi không phải số

            let data = await userApiService.getUserWithPagination(
                +page,
                +limit
            );
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT, //data
            });
        } else {
            let data = await userApiService.getAllUsers();
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT, //data
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "", //data
        });
    }
};
const createFunc = async (req, res) => {
    try {
        //validate
        let data = await userApiService.createUser(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "", //data
        });
    }
};
const updateFunc = async (req, res) => {
    try {
        //validate
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "", //data
        });
    }
};
const deleteFunc = async (req, res) => {
    try {
        console.log(req.body);
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "", //data
        });
    }
};

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
};
