const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const PORT = 5000;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
