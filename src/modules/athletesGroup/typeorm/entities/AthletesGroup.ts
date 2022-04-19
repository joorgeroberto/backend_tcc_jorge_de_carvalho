import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('athletes_group')
class AthletesGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  name: string;

  @Column('int')
  athletes_quantity: number;

  @Column({ default: 'run' })
  sport_name: string;

  @Column()
  advisor_name: string;

  @Column('uuid')
  advisor_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AthletesGroup;
