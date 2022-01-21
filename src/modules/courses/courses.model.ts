import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Course extends Model {
    @PrimaryKey
    @Column({ primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
    id: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    author: string;

    @Column
    price: number;
}