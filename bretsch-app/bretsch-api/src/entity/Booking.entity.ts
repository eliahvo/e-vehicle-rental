import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';
import { Vehicle } from './Vehicle.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column({ default: new Date().toString() })
  startDate: string;

  @Column({ default: new Date().toString() })
  endDate: string;

  @Column()
  paymentStatus: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings, { onDelete: 'CASCADE' })
  vehicle: Vehicle;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
