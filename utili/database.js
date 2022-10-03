const Sequelize = require("sequelize");

const sequelize = new Sequelize ('anmol','root','12123456',
{
dialect:'mysql',
host:'localhost'
});

module.exports=sequelize;