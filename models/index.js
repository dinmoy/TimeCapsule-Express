const sequelize = require('../config/database');
const Letter = require('./letter')(sequelize);
const Music = require('./music')(sequelize);

// Letter.belongsTo(Music, { foreignKey: 'music_id' });  // 외래키 설정

module.exports = {
    Letter,
    Music,
    sequelize,
};
