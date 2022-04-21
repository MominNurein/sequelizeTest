const Sequelize = require('sequelize');
const sequelize = new Sequelize('express', 'root', 'mysql', {
	host: '127.0.0.1',
	dialect: 'mysql',
	operatorsAliases: 0, // ? Should be (0 or 1) instead of (true or false) to pass warning
});

module.exports = sequelize;
global.sequelize = sequelize;
