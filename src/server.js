require('express-async-errors');
const express = require("express")

const migrationsRun = require("./database/knex")
const app = express();
app.use(express.json());

const routes = require("./routes");

app.use(routes);
migrationsRun();

app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
       return response.status(error.statusCode).json({
           status: "error",
           message: error.message
       });
    };
   
    console.error(error);
   
    return response.status(500).json({
       status: "error",
       message: "Internal server error"
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));