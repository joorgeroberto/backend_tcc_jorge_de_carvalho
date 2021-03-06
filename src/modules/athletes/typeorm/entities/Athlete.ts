import Planning from '@modules/planning/typeorm/entities/Planning';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('athletes')
class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'athlete' })
  user_type: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  birthdate: string;

  @Column()
  gender: string;

  @Column('uuid', { nullable: true })
  group_id: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Planning, plannings => plannings.athlete)
  plannings: Planning[];

  @UpdateDateColumn()
  updated_at: Date;
}

export default Athlete;
