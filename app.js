const express = require('express');
const sequelize= require('./config/database');
const app = express();
const port = 3000;

const letterRouter = require('./routes/letter');

app.use(express.json());
app.use('/letters', letterRouter);

sequelize.sync()
    .then(() => {
        console.log('Database synced')
    })
    .catch((err) => {
        console.error('Error syncing database:', err)
    });


app.get('/', (req, res) => {
    res.send('Time Capsule!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
