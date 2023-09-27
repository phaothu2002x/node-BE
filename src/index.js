require("dotenv").config();
import express from "express";
import configCors from "./config/cors";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

//CORS config
configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

// init web routes
initWebRoutes(app);
initApiRoutes(app);

//req=> middleware=> res
app.use((req, res) => {
    return res.send("404 not found");
});
app.listen(PORT, () => {
    console.log("backend is running at " + PORT);
});
