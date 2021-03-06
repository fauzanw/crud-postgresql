'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.users);
      posts.hasMany(models.comments);
    }
  };
  posts.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
    underscored: true,
  });
  return posts;
};