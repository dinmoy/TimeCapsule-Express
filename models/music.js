const { DataTypes } = require('sequelize');

const Music = (sequelize) => {
    return sequelize.define('music', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        music_img_path: { 
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        music_file: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        timestamps: false  // createdAt과 updatedAt을 생성하지 않도록 설정
    });
};

module.exports = Music;
