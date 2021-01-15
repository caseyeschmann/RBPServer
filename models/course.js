const {DataTypes} = require('sequelize');
const db = require('../db')

    const Course = db.define('course', {
        courseState: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseNumber: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        courseTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // how to make date?
        courseDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseCategory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseHours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coursePrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // how to make date?
        courseExpiration: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
module.exports = Course;