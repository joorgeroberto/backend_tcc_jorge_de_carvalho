import Athlete from '@modules/athletes/typeorm/entities/Athlete';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Training from './Training';

@Entity('planning')
class Planning {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int', { name: 'number_of_weeks' })
  numberOfWeeks: number;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'end_date' })
  endDate: string;

  @Column('uuid', { name: 'athlete_id' })
  athleteId: string;

  @OneToMany(() => Training, trainings => trainings.planning, { cascade: true })
  trainings: Training[];

  @ManyToOne(() => Athlete, athlete => athlete.plannings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'athlete_id', referencedColumnName: 'id' })
  athlete: Athlete;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: Date;
}

export default Planning;
