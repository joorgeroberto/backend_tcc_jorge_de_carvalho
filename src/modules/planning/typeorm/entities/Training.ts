import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExerciseGroup from './ExerciseGroup';
import PerformedTraining from './PerformedTraining';
import Planning from './Planning';

@Entity('training')
class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  date: string;

  @Column({ name: 'is_optional' })
  isOptional: boolean;

  @Column('uuid', { name: 'planning_id' })
  planningId: string;

  @ManyToOne(() => Planning, planning => planning.trainings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'planning_id', referencedColumnName: 'id' })
  planning: Planning;

  @OneToOne(() => PerformedTraining, performedTraining => performedTraining.training)
  performedTraining: PerformedTraining;

  @OneToMany(() => ExerciseGroup, exerciseGroup => exerciseGroup.training, { cascade: true })
  exerciseGroups: ExerciseGroup[];

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: Date;
}

export default Training;
