'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('short_links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slug: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
        comment: 'Уникальный кородкий код ссылки',
      },
      original_url: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Оригинальная ссылка редиректа'
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      http_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 302,
        comment: 'HTTP status code for redirect (e.g., 301, 302)',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      max_clicks: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Максимальное колличество переходов',
      },
      click_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      last_accessed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('short_links');
  }
};