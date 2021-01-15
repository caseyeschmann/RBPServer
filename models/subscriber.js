const {DataTypes} = require('sequelize');
const db = require('../db')


    const Subscriber = db.define('subscriber', {

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
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
        },
        currentEmployer: {
            type: DataTypes.STRING,
        },
        enterMessage: {
            type: DataTypes.STRING,
        }
    })

    module.exports = Subscriber;