const {DataTypes} = require('sequelize');
const db = require('../db')


    const Student = db.define('student', {
        isAdmin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licenseState: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licenseNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    module.exports = Student;