
const { DataTypes,Sequelize } = require('sequelize')
const { sequelize } = require('../config/db')
const user =sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
        profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }

},
{
    timestamps: true,
    tableName: 'user',
    createdAt: "created_at",
    updatedAt: "updated_at"
})

module.exports = user
