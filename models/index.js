const sequelize=require('../config/database')

const Letter=require('./letter')(sequelize)
const Music=require('./music')(sequelize)

module.exports={
    Letter,
    Music
}

