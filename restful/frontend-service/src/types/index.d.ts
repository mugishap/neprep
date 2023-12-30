import { IconType } from 'react-icons'

export interface IUser {
    id: string;
    names: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    nationalId: number;
    telephone: string;
    email: string;
    department: string
    position: string
    laptopManufacturer: string;
    model: string
    serialNumber: number;
}

