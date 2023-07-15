const sequelize=require('../util/db');
const dataType=require('sequelize');
sequelize.options.logging = false;

const User=sequelize.define(
    'expensetracker',
{
    id:{
        type:dataType.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },
    selling:{
        type:dataType.STRING
    },
    product:{
        type:dataType.STRING
    },
    category:{
        type:dataType.STRING
    }
}
,
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
)

module.exports=User