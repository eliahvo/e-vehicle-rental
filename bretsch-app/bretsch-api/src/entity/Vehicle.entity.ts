import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./Booking.entity";
import { VehicleType } from "./VehicleType.entity";

@Entity()
export class Vehicle {
  @PrimaryColumn()
  licencePlate: string;

  @Column()
  status: string;

  @Column()
  positionLongitude: string;

  @Column()
  positionLatitude: string;

  @Column()
  batteryLevel: number;

  @ManyToOne(() => VehicleType, vehicleType => vehicleType.vehicles)
  vehicleType: VehicleType;

  @OneToMany(() => Booking, booking => booking.vehicle)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}