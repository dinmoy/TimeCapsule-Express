const sequelize = require('sequelize')
const {DataType}=require('sequelize')

const Music=(sequelize)=>{
  return sequelize.define('Music',{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true,
    },
    title:{
      type:DataTypes.STRING(255),
      allowNull:false,
    },
    music_img:{
      type:DataTypes.STRING(500),
      allowNull:false,
    },
  })
}

module.exports=Music