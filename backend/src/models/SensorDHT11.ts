import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'sensores_dht11', 
  timestamps: false, 
})
export class SensorDHT11 extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number; 

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW, 
  })
  data_hora!: Date; 

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
  })
  temperatura!: number; 

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
  })
  umidade!: number; 
}
