const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const winston = require('winston')

const dotenv = require('dotenv');
dotenv.config();


// logger set up
// const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
  });

const PORT = 5000;
const app = express();

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/', routes);


///// swagger set up
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Hero of Flavor: Tears of the Kingdom API",
            version: "1.0.0",
            description: "An API to search for all ingredients, recipes, and a recipe tool for The Legend of Zelda: Tears of the Kingdom. Use the tools to make your cooking in TOTK much more efficient!"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
