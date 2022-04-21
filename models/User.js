'use strict';
const { Model, Sequelize } = require('sequelize');
const Post = require('./Post');
module.exports = (sequelize) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(Post, { as: 'Posts', foreignKey: 'user_id' });
		}
	}
	User.init(
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			username: {
				type: Sequelize.STRING(30),
				unique: true,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING(100),
				unique: true,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
