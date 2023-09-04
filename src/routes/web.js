import express from "express";
import homeController from "../controllers/homeController";
import apiController from "../controllers/apiController";
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
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id", homeController.getUpdateUser);
    router.post("/user/update-user", homeController.handleUpdateUser);

    // rest API
    router.get("/api/test-api", apiController.testApi);

    return app.use("/", router);
};

export default initWebRoutes;
