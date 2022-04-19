import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ExerciseGroup from './ExerciseGroup';

type ExerciseType = 'duration' | 'distance';

@Entity('exercise')
class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'exercise_group_id' })
  exerciseGroupId: string;

  @Column('varchar')
  type: ExerciseType;

  @Column('varchar', { nullable: true })
  duration: string;

  @Column('float', { nullable: true })
  distance: number;

  @Column('varchar')
  description: string;

  @ManyToOne(() => ExerciseGroup, exerciseGroup => exerciseGroup.exercises, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'exercise_group_id', referencedColumnName: 'id' })
  exerciseGroup: ExerciseGroup;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: Date;
}

export default Exercise;
