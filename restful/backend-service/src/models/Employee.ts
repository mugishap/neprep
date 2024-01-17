'use strict';
import DataTypes from 'sequelize/lib/data-types';
import sequelize from './../utils/database';

const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    firstName: { type: DataTypes.STRING, allowNull: false, },
    lastName: { type: DataTypes.STRING, allowNull: false, },
    nationalId: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { len: [16, 16] } },
    department: { type: DataTypes.STRING, allowNull: false, },
    position: { type: DataTypes.STRING, allowNull: false, },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    telephone: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { len: [10, 10] } },
    brand: { type: DataTypes.STRING, allowNull: false, },
    serialNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    model: { type: DataTypes.STRING, allowNull: false },
}, {});

Employee.sync().catch((err: any) => {
    console.log("An error occurred while creating employee table:", err);
});

export default Employee;