const { Sequelize, DataTypes } = require('sequelize')
const sequelize=require('../config/database')
const Letter=require('./letter')(sequelize)
const Music=require('./music')(sequelize)

Letter.belongsTo(Music,{foreignKey: 'music_id'})

module.exports={
    Letter,
    Music,
    sequelize,
}