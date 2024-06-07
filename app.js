const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { sequelize } = require('./models');
const musicRouter = require('./routes/music');
const uploadFiles = require('./scripts/uploadMusic');
const letterRouter = require('./routes/letter');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/music', express.static(path.join(__dirname, 'music')));

app.use('/music', musicRouter);
app.use('/letters', letterRouter);

sequelize.sync({ force: true })
    .then(async () => {
        console.log('Database synchronized');
        await uploadFiles();
        app.listen(port, () => {
            console.log(`Server is running on http://${process.env.HOST}:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });