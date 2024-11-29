const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { port } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes')
const morgan = require('morgan')

const app = express();

connectDB();

app.use(morgan('dev'))

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});