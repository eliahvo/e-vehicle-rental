import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Vehicle } from "./Vehicle.entity";

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn()
	vehicleTypeId: number;

  @Column()
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