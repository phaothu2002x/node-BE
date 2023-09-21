import express from "express";
import configCors from "./config/cors";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";

require("dotenv").config();
import bodyParser from "body-parser";
import { createJWT, verifyToken } from "./middleware/JWTAction";

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

// test jwt
createJWT();
let decodedData = verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicnlhbiIsImFkZHJlc3MiOiJIQ00iLCJpYXQiOjE2OTUyOTUyOTd9.BiaY55FPIAsYZ3EPh1zwUYOgm8duCROnn3o4xcPZHTY"
);
console.log(decodedData);
// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log("backend is running at " + PORT);
});
