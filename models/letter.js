const { DataTypes } = require('sequelize');

const Letter = (sequelize) => {
    return sequelize.define('letters', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        recipient: {
            type: DataTypes.STRING(20),
        },
        email: {
            type: DataTypes.STRING(255),
        },
        content: {
            type: DataTypes.STRING(500),
        },
        capsule: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        music_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'music',
                key: 'id',
            },
        },
        emailSent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
};

module.exports = Letter;
