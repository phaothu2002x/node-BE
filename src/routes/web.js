import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUser);
    router.post("/user/create-user", homeController.handleCreateUser);

    return app.use("/", router);
};

export default initWebRoutes;
