const express = require("express");
const users_router = require("./users.route");


function routerApi(app){
    const routes = express.Router();
    routes.use("/users",users_router); /* endpoint http://localhost:3977/api/v1/users/ */
    app.use("/api/v1", routes); /* endpoint http://localhost:3977/api/v1 */
}

module.exports = routerApi;
