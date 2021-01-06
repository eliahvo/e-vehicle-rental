import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./Booking.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
	userId: number;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column()
  type: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthday: string;

  @Column()
  preferedPayment: string;

  @Column()
  streetPlusNumber: string;

  @Column()
  city: string;

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}