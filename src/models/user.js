const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //validate เป็นชุดคำสั่ง ตรวจสอบของ JS ก่อนจะ Insert Data ไม่ใช่ โครงสร้างใน Database https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[0-9]{10}$/, // Regular expression check phone number
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //short hand syntext
    profileImage: DataTypes.STRING,
    coverImage: DataTypes.STRING
},{
    underscored: true

  });
    
  // กำหนดลักษะณะความสัมพันธิ์ กับตารางอื่น
User.associate = models => {
 User.hasMany(models.Post, {
    foreignKey: {
      name: 'userId',
      allowNull: false
    },
    onDelete: 'CASCADE'
 })

 User.hasMany(models.Comment, {
  foreignKey:{
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE'
 })





}
 return User;
};
