const { Sequelize, DataTypes } = require('sequelize')
const sequelize=require('../config/database')

const Letter=require('./letter')(sequelize)

module.exports={
    Letter,
}