'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class short_link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  short_link.init({
    qr_code: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'QR-код для данного сокращения (base64, SVG, PNG-URL и т.п.)',
    },
    slug: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      comment: 'Уникальный кородкий код ссылки',
    },
    original_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Оригинальная ссылка редиректа'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    http_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 302,
      comment: 'HTTP status code for redirect (e.g., 301, 302)',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    max_clicks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Максимальное колличество переходов',
    },
    click_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    last_accessed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'short_link',
  });
  return short_link;
};