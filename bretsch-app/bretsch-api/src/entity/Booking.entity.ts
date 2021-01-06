import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Vehicle } from "./Vehicle.entity";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column({default: new Date().toString() })
  startDate: string;

  @Column({default: new Date().toString()})
  endDate: string;

  @Column()
  paymentStatus: string;

  @ManyToOne(() => Vehicle, vehicle => vehicle.bookings)
  vehicle: Vehicle;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}