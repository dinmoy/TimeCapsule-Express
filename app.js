const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const musicRouter = require('./routes/music');
const uploadFiles = require('./scripts/uploadMusic');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/music', express.static(path.join(__dirname, 'music')));

app.use('/music', musicRouter);

sequelize.sync({ force: true })
    .then(async () => {
        console.log('Database synchronized');
        await uploadFiles();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
