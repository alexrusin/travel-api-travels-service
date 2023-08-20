import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import Travel from "./Travel";

@Table({
  timestamps: true,
  tableName: "tours",
  modelName: "Tour",
})
class Tour extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => Travel)
  @Column({
    type: DataType.UUID,
  })
  declare travel_id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.DATEONLY,
  })
  declare starting_date: Date;

  @Column({
    type: DataType.DATEONLY,
  })
  declare ending_date: Date;

  @Column({
    type: DataType.DECIMAL(10, 4),
  })
  declare price: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}

export default Tour;
