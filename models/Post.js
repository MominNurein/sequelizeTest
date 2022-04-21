'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Post.belongsTo(models.User, {
				as: 'User',
				foreignKey: 'user_id',
			});
		}
	}
	Post.init(
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING(100),
			},
			content: {
				type: Sequelize.STRING,
			},
		},
		{
			sequelize,
			modelName: 'Post',
		}
	);
	return Post;
};
