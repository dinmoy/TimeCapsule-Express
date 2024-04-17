const {DataTypes}=require('sequelize')

const Letters=(sequelize)=>{
    return sequelize.define('letters',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true,
        },
        recipient:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        email:{
            type:DataType.STRING(255),
            allowNull:false,
        },
        content:{
            type:DataTypes.STRING(500),
            allowNull:false,
        },
        capsule:{
            type:DataTypes.STRING(500),
            allowNull:false,
        },
        musice_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'music',
                key:'id',
            },
            allowNull:false,
        },
    })
}
module.exports=Letters