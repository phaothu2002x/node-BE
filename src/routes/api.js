import express from "express";

import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const tesMiddleWare = (req, res, next) => {
    console.log("calling middleware");
    next();
};

// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ["/", "/register", "/login"];
//     if (nonSecurePaths.includes(req.path)) return next();

//     //authenticate user
//     next();
// };

const initAPIRoutes = (app) => {
    //path, handler
    // rest API
    //get --R, post- C, put-U, delete-D

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get(
        "/user/read",
        checkUserJWT,
        checkUserPermission,
        userController.readFunc
    );
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get("/group/read", groupController.readFunc);

    return app.use("/api/v1/", router);
};

export default initAPIRoutes;
