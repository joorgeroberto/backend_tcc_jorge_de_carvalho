import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('athletes')
class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  user_type: number;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('int')
  phone: number;

  @Column()
  birthdate: string;

  @Column()
  gender: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Athlete;
