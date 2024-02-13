
export interface TimestampAudit {
    createdAt?: Date
    updatedAt?: Date
}
export interface IUser extends TimestampAudit {

    id: string
    names: string;
    email: string;
    telephone: string;
    password: string;
    role: string;
}