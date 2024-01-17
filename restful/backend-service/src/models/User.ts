'use strict';
import DataTypes from 'sequelize/lib/data-types';
import sequelize from './../utils/database';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: false, },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, {});

User.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY);
  return token;
};

User.sync().catch((err: any) => {
  console.log("An error occurred while creating User table:", err);
});

export default User;