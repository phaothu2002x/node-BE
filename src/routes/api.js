import express from "express";

import apiController from "../controllers/apiController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initAPIRoutes = (app) => {
    //path, handler
    // rest API
    //get --R, post- C, put-U, delete-D
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);

    return app.use("/api/v1/", router);
};

export default initAPIRoutes;
