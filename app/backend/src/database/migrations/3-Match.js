'use strict';

module.exports = {
 up: async (queryInterface, Sequelize) => {
 await queryInterface.createTable('matches', {
  id: {
   type: Sequelize.INTEGER.UNSIGNED,
   autoIncrement: true,
   primaryKey: true,
 },
 home_team: {
   type: Sequelize.INTEGER,
   allowNull: false,
   references: {
    model: 'teams',
    key: 'id'
   },
   onUpdate: 'CASCADE',
   OnDelete: 'CASCADE',
 },
 home_team_goals: {
   type: Sequelize.INTEGER,
   allowNull: false,
 },
 away_team: {
   type: Sequelize.INTEGER,
   allowNull: false,
   references: {
    model: 'teams',
    key: 'id'
   },
   onUpdate: 'CASCADE',
   OnDelete: 'CASCADE',
 },
 away_team_goals: {
   type: Sequelize.INTEGER,
   allowNull: false,
 },
 in_progress: {
   type: Sequelize.BOOLEAN,
   allowNull: false,
 },
});
 },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
 };