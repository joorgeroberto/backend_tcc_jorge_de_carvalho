import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Exercise from './Exercise';
import Training from './Training';

@Entity('exercise_group')
class ExerciseGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'training_id' })
  trainingId: string;

  @ManyToOne(() => Training, training => training.exerciseGroups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'training_id', referencedColumnName: 'id' })
  training: Training;

  @Column('int', { name: 'number_repetitions' })
  numberRepetitions: number;

  @OneToMany(() => Exercise, exercises => exercises.exerciseGroup, { cascade: true })
  exercises: Exercise[];

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: Date;
}

export default ExerciseGroup;
