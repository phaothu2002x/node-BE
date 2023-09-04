import express from "express";
import configCors from "./config/cors";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";

require("dotenv").config();
import bodyParser from "body-parser";
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

//test connectionDb
// connection();

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log("backend is running at " + PORT);
});
