import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Vehicle } from "./Vehicle.entity";

@Entity()
export class VehicleType {
  @PrimaryColumn()
  type: string;

  @Column()
  pricePerMinute: number;

  @Column()
  minimalBatteryLevel: number;

  @OneToMany(() => Vehicle, vehicle => vehicle.vehicleType)
  vehicles: Vehicle[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}