import { BeforeCreate, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { hashSync } from 'bcrypt'
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from 'sequelize';
// import { Role } from 'src/utils/roles/role.enum';

@Table
export class User extends Model {
    @PrimaryKey
    @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
    id: string;

    @Column
    name: string;

    @Column
    email: string;

    @Column({ type: DataTypes.JSON })
    roles: string;

    @Column
    password: string;

    @BeforeCreate
    static hashPassword(instance: User) {
        const encryptedPassword = hashSync(instance.password, 10)
        instance.password = encryptedPassword
    }
}