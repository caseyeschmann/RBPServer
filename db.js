const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.PGDATABASE_URL, {
    dialect: 'postgres'
});

module.exports = db;



// const sequelize = new Sequelize('RedBadgeProject', 'postgres', 'password', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

// sequelize.authenticate().then(
//     function() {
//         console.log('Connected to database');
//     },
//     function(err){
//         console.log(err)
//     }
// );

// module.exports = sequelize;
